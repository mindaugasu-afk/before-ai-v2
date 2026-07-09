"use client";

import { useState } from "react";
import type { StoryEvent } from "./page";

type XpDesktopProps = {
  events: StoryEvent[];
};

export function XpDesktop({ events }: XpDesktopProps) {
  const [selectedEvent, setSelectedEvent] = useState<StoryEvent>(events[0]);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(true);

  const openEvent = (event: StoryEvent) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
    setIsRsvpOpen(false);
  };

  return (
    <main className="xp-screen">
      <section className="desktop-icons" aria-label="Desktop shortcuts">
        {events.slice(0, 3).map((event) => (
          <button className="desktop-icon" key={event.id} onClick={() => openEvent(event)}>
            <span>{event.icon}</span>
            <small>{event.title}</small>
          </button>
        ))}
        <button className="desktop-icon" onClick={() => setIsHelpOpen(true)}>
          <span>❔</span>
          <small>ReadMe.txt</small>
        </button>
      </section>

      <section className="xp-window main-window" aria-labelledby="main-window-title">
        <div className="xp-titlebar">
          <span id="main-window-title">Code Before AI - Event Explorer</span>
          <div className="window-actions" aria-hidden="true">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>
        <div className="xp-menubar" aria-label="Application menu">
          <span>File</span>
          <span>Events</span>
          <span>Stories</span>
          <span>Help</span>
        </div>
        <div className="xp-toolbar">
          <button onClick={() => setIsHelpOpen(true)}>About</button>
          <button onClick={() => setIsRsvpOpen(true)}>RSVP Wizard</button>
          <button onClick={() => setIsStartOpen((value) => !value)}>Start Menu</button>
        </div>
        <div className="xp-window-body explorer-layout">
          <aside className="folder-pane">
            <h2>Event Folders</h2>
            <button className="folder active">📁 All Stories</button>
            <button className="folder">📁 Debugging</button>
            <button className="folder">📁 Releases</button>
            <button className="folder">📁 Browser Wars</button>
          </aside>
          <section className="event-grid" aria-label="Upcoming events">
            {events.map((event) => (
              <article className="xp-card" key={event.id}>
                <button className="event-image" onClick={() => openEvent(event)}>
                  <span>{event.icon}</span>
                </button>
                <div className="event-copy">
                  <p className="file-label">{event.status}</p>
                  <h2>{event.title}</h2>
                  <p>{event.summary}</p>
                  <dl>
                    <div>
                      <dt>Date</dt>
                      <dd>{event.date}</dd>
                    </div>
                    <div>
                      <dt>Speaker</dt>
                      <dd>{event.speaker}</dd>
                    </div>
                  </dl>
                  <div className="button-row">
                    <button onClick={() => openEvent(event)}>Open</button>
                    <button onClick={() => setIsRsvpOpen(true)}>RSVP</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>

      {isDetailsOpen ? (
        <section className="xp-window floating-window details-window" aria-label="Event details">
          <div className="xp-titlebar">
            <span>{selectedEvent.title}.exe</span>
            <div className="window-actions">
              <button aria-label="Minimize details window">_</button>
              <button aria-label="Maximize details window">□</button>
              <button aria-label="Close details window" onClick={() => setIsDetailsOpen(false)}>
                ×
              </button>
            </div>
          </div>
          <div className="xp-window-body">
            <div className="dialog-icon">{selectedEvent.icon}</div>
            <div>
              <p className="file-label">Opening story archive</p>
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.story}</p>
              <div className="details-list">
                <span>{selectedEvent.date}</span>
                <span>{selectedEvent.time}</span>
                <span>{selectedEvent.venue}</span>
              </div>
              <div className="button-row right">
                <button onClick={() => setIsRsvpOpen(true)}>Run RSVP Wizard</button>
                <button onClick={() => setIsDetailsOpen(false)}>OK</button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isRsvpOpen ? (
        <section className="xp-window floating-window rsvp-window" aria-label="RSVP wizard">
          <div className="xp-titlebar">
            <span>RSVP Wizard</span>
            <div className="window-actions">
              <button aria-label="Close RSVP wizard" onClick={() => setIsRsvpOpen(false)}>
                ×
              </button>
            </div>
          </div>
          <div className="xp-window-body wizard-body">
            <div className="wizard-sidebar">
              <span>✓</span>
              <p>Step 1 of 3</p>
            </div>
            <form className="xp-form">
              <h2>Reserve a chair and a story</h2>
              <label>
                Your name
                <input placeholder="Ada Lovelace" />
              </label>
              <label>
                Favorite old tool
                <select defaultValue="Borland">
                  <option>Borland</option>
                  <option>Visual Basic 6</option>
                  <option>Notepad</option>
                  <option>Turbo Pascal</option>
                </select>
              </label>
              <div className="button-row right">
                <button type="button" onClick={() => setIsRsvpOpen(false)}>
                  Cancel
                </button>
                <button type="button" onClick={() => setIsRsvpOpen(false)}>
                  Finish
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      {isHelpOpen ? (
        <aside className="xp-popup" role="note">
          <div className="popup-title">
            <strong>Windows XP vibe enabled</strong>
            <button aria-label="Close note" onClick={() => setIsHelpOpen(false)}>
              ×
            </button>
          </div>
          <p>
            Double-click the memories. Hear programmers explain how they coded
            before AI autocomplete, instant answers, and deploy buttons with manners.
          </p>
        </aside>
      ) : null}

      {isStartOpen ? (
        <section className="start-menu" aria-label="Start menu">
          <div className="start-user">👴 Code Before AI</div>
          <button onClick={() => openEvent(events[0])}>Recent Story</button>
          <button onClick={() => setIsRsvpOpen(true)}>RSVP Wizard</button>
          <button onClick={() => setIsHelpOpen(true)}>Help and Support</button>
          <button onClick={() => setIsStartOpen(false)}>Log Off</button>
        </section>
      ) : null}

      <footer className="xp-taskbar">
        <button className="start-button" onClick={() => setIsStartOpen((value) => !value)}>
          start
        </button>
        <button className="task-button active">Code Before AI</button>
        {isDetailsOpen ? <button className="task-button">{selectedEvent.title}</button> : null}
        {isRsvpOpen ? <button className="task-button">RSVP Wizard</button> : null}
        <div className="tray">
          <span>🔊</span>
          <span>LAN</span>
          <time>7:42 PM</time>
        </div>
      </footer>
    </main>
  );
}
