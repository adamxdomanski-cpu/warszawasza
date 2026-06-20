import logging
import os
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)


def _load_dotenv() -> None:
    env_path = Path(__file__).resolve().parents[2] / ".env"
    if not env_path.is_file():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


_load_dotenv()


class MixpanelTracker:
    def __init__(self) -> None:
        self._token = os.getenv("MIXPANEL_PROJECT_TOKEN", "").strip()
        self._client = None

        if not self._token:
            logger.info("Mixpanel disabled: MIXPANEL_PROJECT_TOKEN is not set")
            return

        try:
            from mixpanel import Mixpanel

            self._client = Mixpanel(self._token)
            logger.info("Mixpanel enabled")
        except Exception:
            logger.exception("Failed to initialize Mixpanel client")

    @property
    def enabled(self) -> bool:
        return self._client is not None

    @property
    def project_token(self) -> str:
        return self._token

    def track(
        self,
        distinct_id: str,
        event: str,
        properties: dict[str, Any] | None = None,
    ) -> None:
        if not self._client:
            return

        props = dict(properties or {})
        props.setdefault("ip", 0)

        try:
            self._client.track(distinct_id, event, props)
        except Exception:
            logger.exception("Mixpanel track failed for event %s", event)


tracker = MixpanelTracker()
