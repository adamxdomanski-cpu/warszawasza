from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import HTMLResponse

from backend.engine.engine import WarszawaszaEngine

app = FastAPI()

engine = WarszawaszaEngine()


class InputModel(BaseModel):
    input: str


@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.post("/generate")
def generate(data: InputModel):
    return engine.process(data.input)


@app.get("/drop001")
def drop_001():
    return engine.drop_001()


@app.get("/topdrops")
def top_drops():
    return engine.top_drops()


@app.get("/", response_class=HTMLResponse)
def home():

    return """
    <html>
        <head>
            <title>Warszawasza Engine</title>
        </head>
        <body style="font-family: Arial; padding: 40px;">

            <h1>WARSZAWASZA ENGINE</h1>

            <button onclick="generate()">GENERATE TOP DROPS</button>

            <pre id="output" style="margin-top:20px;"></pre>

            <script>
                async function generate() {
                    const res = await fetch('/topdrops');
                    const data = await res.json();
                    document.getElementById('output').innerText =
                        JSON.stringify(data, null, 2);
                }
            </script>

        </body>
    </html>
    """