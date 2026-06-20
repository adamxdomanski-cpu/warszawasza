from fastapi import FastAPI, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import HTMLResponse

from backend.analytics.mixpanel_client import tracker
from backend.engine.engine import WarszawaszaEngine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:8000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = WarszawaszaEngine()


class InputModel(BaseModel):
    input: str


def resolve_distinct_id(
    request: Request,
    x_distinct_id: str | None = Header(default=None),
) -> str:
    if x_distinct_id:
        return x_distinct_id
    if request.client and request.client.host:
        return f"server:{request.client.host}"
    return "anonymous"


def mixpanel_snippet() -> str:
    if not tracker.enabled:
        return ""

    token = tracker.project_token
    return f"""
            <script type="text/javascript">
                (function (f, b) {{
                    if (!b.__SV) {{
                        var e, g, i, h;
                        window.mixpanel = b;
                        b._i = [];
                        b.init = function (e, f, c) {{
                            function g(a, d) {{
                                var b = d.split(".");
                                2 == b.length && ((a = a[b[0]]), (d = b[1]));
                                a[d] = function () {{
                                    a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
                                }};
                            }}
                            var a = b;
                            "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel");
                            a.people = a.people || [];
                            a.toString = function (a) {{
                                var d = "mixpanel";
                                "mixpanel" !== c && (d += "." + c);
                                a || (d += " (stub)");
                                return d;
                            }};
                            a.people.toString = function () {{
                                return a.toString(1) + ".people (stub)";
                            }};
                            i =
                                "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has opted_in_tracking has opted_out_tracking clear opt_in opt_out people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(
                                    " "
                                );
                            for (h = 0; h < i.length; h++) g(a, i[h]);
                            b._i.push([e, f, c]);
                        }};
                        b.__SV = 1.2;
                        e = f.createElement("script");
                        e.type = "text/javascript";
                        e.async = !0;
                        e.src =
                            "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL
                                ? MIXPANEL_CUSTOM_LIB_URL
                                : "file:" === f.location.protocol &&
                                    "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)
                                  ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
                                  : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
                        g = f.getElementsByTagName("script")[0];
                        g.parentNode.insertBefore(e, g);
                    }}
                }})(document, window.mixpanel || []);
                mixpanel.init("{token}", {{
                    track_pageview: true,
                    persistence: "localStorage",
                }});
            </script>
    """


@app.get("/ping")
def ping(
    request: Request,
    x_distinct_id: str | None = Header(default=None),
):
    distinct_id = resolve_distinct_id(request, x_distinct_id)
    tracker.track(distinct_id, "api_ping")
    return {"status": "ok"}


@app.post("/generate")
def generate(
    data: InputModel,
    request: Request,
    x_distinct_id: str | None = Header(default=None),
):
    result = engine.process(data.input)
    distinct_id = resolve_distinct_id(request, x_distinct_id)
    tracker.track(
        distinct_id,
        "content_generated",
        {
            "input_length": len(data.input),
            "persona": result.get("persona"),
            "state": result.get("state"),
        },
    )
    return result


@app.get("/drop001")
def drop_001(
    request: Request,
    x_distinct_id: str | None = Header(default=None),
):
    drops = engine.drop_001()
    distinct_id = resolve_distinct_id(request, x_distinct_id)
    tracker.track(
        distinct_id,
        "drop001_viewed",
        {"drop_count": len(drops)},
    )
    return drops


@app.get("/topdrops")
def top_drops(
    request: Request,
    x_distinct_id: str | None = Header(default=None),
):
    drops = engine.top_drops()
    distinct_id = resolve_distinct_id(request, x_distinct_id)
    tracker.track(
        distinct_id,
        "top_drops_viewed",
        {"drop_count": len(drops)},
    )
    return drops


@app.get("/", response_class=HTMLResponse)
def home():

    return f"""
    <html>
        <head>
            <title>Warszawasza Engine</title>
            {mixpanel_snippet()}
        </head>
        <body style="font-family: Arial; padding: 40px;">

            <h1>WARSZAWASZA ENGINE</h1>

            <button onclick="generate()">GENERATE TOP DROPS</button>

            <pre id="output" style="margin-top:20px;"></pre>

            <script>
                function analyticsHeaders() {{
                    if (typeof mixpanel === "undefined") {{
                        return {{}};
                    }}
                    return {{ "X-Distinct-Id": mixpanel.get_distinct_id() }};
                }}

                async function generate() {{
                    if (typeof mixpanel !== "undefined") {{
                        mixpanel.track("top_drops_clicked");
                    }}

                    const res = await fetch(`${{window.location.origin}}/topdrops`, {{
                        headers: analyticsHeaders(),
                    }});
                    const data = await res.json();

                    if (typeof mixpanel !== "undefined") {{
                        mixpanel.track("top_drops_loaded", {{
                            drop_count: data.length,
                        }});
                    }}

                    document.getElementById("output").innerText =
                        JSON.stringify(data, null, 2);
                }}
            </script>

        </body>
    </html>
    """
