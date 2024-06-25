import { useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

export default function Alarm() {
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const sseEvents = new EventSource("http://localhost:3001/sse", {
      headers: {
        "Content-Type": "text/event-stream",
      },
      heartbeatTimeout: 86400000,
      withCredentials: false,
    });
  }, []);
  return <div className="alarm-btn">alarm</div>;
}
