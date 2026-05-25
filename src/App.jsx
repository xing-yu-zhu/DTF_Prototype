import { useMemo, useState } from 'react'

const soundOptions = [
  { name: 'Ocean hush', subtitle: 'Low tide + soft foam' },
  { name: 'Rain on glass', subtitle: 'Steady droplets and distant wind' },
  { name: 'Forest slow', subtitle: 'Night crickets and leaves' },
]

const temperaturePresets = [
  { label: 'Cool', value: 18 },
  { label: 'Balanced', value: 22 },
  { label: 'Warm', value: 26 },
]

const summarySessions = [
  { date: 'Sun, May 19', noteCount: 2, focus: 'Cooling routine' },
  { date: 'Tue, May 21', noteCount: 1, focus: 'Sleep audio preference' },
  { date: 'Thu, May 23', noteCount: 3, focus: 'Wake-up comfort' },
  { date: 'Sat, May 25', noteCount: 2, focus: 'Late-night ideas' },
]

function createSummary(session, temperature, soundName) {
  if (!session) {
    return 'Choose a date to generate an AI recap of that night\'s recorded thoughts.'
  }

  return `AI recap for ${session.date}: ${session.noteCount} bedtime note${session.noteCount > 1 ? 's were' : ' was'} captured around ${session.focus.toLowerCase()}. The pillow was set to ${temperature}C with ${soundName.toLowerCase()} playing, so the app can connect that night's ideas to the sleep environment.`
}

export default function App() {
  const [connected, setConnected] = useState(false)
  const [temperature, setTemperature] = useState(22)
  const [selectedSound, setSelectedSound] = useState(soundOptions[1])
  const [playing, setPlaying] = useState(true)
  const [recording, setRecording] = useState(false)
  const [selectedSession, setSelectedSession] = useState(summarySessions[3])
  const [summaryRequested, setSummaryRequested] = useState(true)

  const summary = useMemo(
    () => createSummary(selectedSession, temperature, selectedSound.name),
    [selectedSession, temperature, selectedSound],
  )

  const tempPercent = ((temperature - 16) / 14) * 100

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent px-4 py-8 text-stone-100 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:gap-14">
        <section className="max-w-md space-y-4 text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-200/70">
            Smart pillow prototype
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl">
            A bedside app for cooling down and catching late-night ideas.
          </h1>
          <p className="text-sm leading-7 text-stone-300 sm:text-base">
            This concept pairs Bluetooth pillow controls with a voice-first note flow,
            calming sleep audio, and an instant AI summary so thoughts are saved before
            they disappear.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-stone-200 backdrop-blur">
              Bluetooth pairing
            </div>
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-stone-200 backdrop-blur">
              Temperature control
            </div>
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-stone-200 backdrop-blur">
              AI bedtime summary
            </div>
          </div>
        </section>

        <section className="relative flex w-full max-w-[430px] justify-center">
          <div className="absolute inset-x-8 top-6 h-32 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative w-full max-w-[390px] rounded-[3rem] border border-white/10 bg-neutral-950/80 p-3 shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="mx-auto mb-2 h-7 w-32 rounded-full bg-black/80" />
            <div className="relative h-[844px] max-h-[78vh] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,#163542_0%,#1a4550_26%,#223d39_54%,#1a2328_100%)] sm:max-h-[844px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,232,180,0.22),_transparent_26%),radial-gradient(circle_at_80%_12%,_rgba(109,213,255,0.18),_transparent_18%)]" />
              <div className="relative flex h-full flex-col overflow-y-auto px-5 pb-6 pt-5 text-stone-100">
                <div className="mb-5 flex items-center justify-between text-xs font-medium text-stone-200/80">
                  <span>9:41</span>
                  <span>{connected ? 'Pillow linked' : 'Bluetooth idle'}</span>
                </div>

                <div className="mb-5 rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-lg shadow-black/10 backdrop-blur-md">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-100/70">
                        Sleep mode
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">CloudNine Pillow</h2>
                      <p className="mt-1 text-sm text-stone-300">
                        Gentle cooling, quiet audio, and hands-free thought capture.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConnected((value) => !value)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        connected
                          ? 'bg-emerald-300 text-emerald-950'
                          : 'bg-white/10 text-stone-100 hover:bg-white/18'
                      }`}
                    >
                      {connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="rounded-2xl bg-black/15 px-3 py-3">
                      <p className="text-xs text-stone-300">Temp</p>
                      <p className="mt-1 text-lg font-semibold">{temperature}C</p>
                    </div>
                    <div className="rounded-2xl bg-black/15 px-3 py-3">
                      <p className="text-xs text-stone-300">Sound</p>
                      <p className="mt-1 text-lg font-semibold">{playing ? 'On' : 'Off'}</p>
                    </div>
                    <div className="rounded-2xl bg-black/15 px-3 py-3">
                      <p className="text-xs text-stone-300">Ideas</p>
                      <p className="mt-1 text-lg font-semibold">Saved</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 rounded-[2rem] border border-white/10 bg-black/18 p-4 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">
                        Temperature
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">Adjust pillow climate</h3>
                    </div>
                    <div className="rounded-full bg-cyan-200/15 px-3 py-1 text-sm text-cyan-100">
                      {temperature <= 19 ? 'Deep cool' : temperature >= 25 ? 'Cozy warm' : 'Balanced'}
                    </div>
                  </div>

                  <div className="mb-4 flex gap-2">
                    {temperaturePresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setTemperature(preset.value)}
                        className={`flex-1 rounded-2xl px-3 py-3 text-sm transition ${
                          temperature === preset.value
                            ? 'bg-stone-100 text-slate-900'
                            : 'bg-white/8 text-stone-100 hover:bg-white/14'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <input
                      type="range"
                      min="16"
                      max="30"
                      value={temperature}
                      onChange={(event) => setTemperature(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-amber-200"
                      style={{
                        background: `linear-gradient(90deg, rgba(141,235,255,0.95) 0%, rgba(141,235,255,0.95) ${tempPercent}%, rgba(255,255,255,0.12) ${tempPercent}%, rgba(255,255,255,0.12) 100%)`,
                      }}
                    />
                    <div className="mt-2 flex justify-between text-xs text-stone-300">
                      <span>16C</span>
                      <span>30C</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 rounded-[2rem] border border-white/10 bg-black/16 p-4 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-100/70">
                        Sleep sounds
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">Play a relaxing loop</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPlaying((value) => !value)}
                      className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-stone-100"
                    >
                      {playing ? 'Pause' : 'Play'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {soundOptions.map((option) => {
                      const active = selectedSound.name === option.name

                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => {
                            setSelectedSound(option)
                            setPlaying(true)
                          }}
                          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                            active
                              ? 'bg-amber-100 text-stone-900'
                              : 'bg-white/7 text-stone-100 hover:bg-white/12'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className={`text-xs ${active ? 'text-stone-700' : 'text-stone-300'}`}>
                              {option.subtitle}
                            </p>
                          </div>
                          <span className="text-xs uppercase tracking-[0.25em]">
                            {active && playing ? 'Live' : 'Select'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col rounded-[2rem] border border-white/10 bg-stone-950/35 p-4 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-rose-100/70">
                        Thought capture
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">Bedtime ideas</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <section className="rounded-[1.75rem] border border-white/8 bg-white/6 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-stone-300">
                            Start recording
                          </p>
                          <p className="mt-2 text-sm leading-6 text-stone-300">
                            Tap once to capture a late-night idea with the pillow microphone.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRecording((value) => !value)}
                          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                            recording
                              ? 'bg-rose-300 text-rose-950'
                              : 'bg-white/10 text-stone-100 hover:bg-white/16'
                          }`}
                        >
                          {recording ? 'Stop mic' : 'Start mic'}
                        </button>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-sm text-stone-300">
                        {recording
                          ? 'Recording in progress. The pillow is listening for a short bedtime thought.'
                          : 'Microphone ready.'}
                      </div>
                    </section>

                    <section className="flex min-h-0 flex-1 flex-col rounded-[1.75rem] border border-cyan-100/12 bg-[linear-gradient(180deg,rgba(10,21,27,0.44)_0%,rgba(8,16,21,0.7)_100%)] p-4">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                            AI summary
                          </p>
                          <h4 className="mt-2 text-base font-semibold text-stone-50">
                            Summarize past nights
                          </h4>
                          <p className="mt-1 text-sm text-stone-300">
                            Pick a date, then let AI generate a recap for that night.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSummaryRequested(true)}
                          className="shrink-0 rounded-full bg-cyan-200 px-4 py-2 text-sm font-medium text-slate-900"
                        >
                          Generate
                        </button>
                      </div>

                      <div className="mb-3 grid grid-cols-2 gap-2">
                        {summarySessions.map((session) => {
                          const active = selectedSession.date === session.date

                          return (
                            <button
                              key={session.date}
                              type="button"
                              onClick={() => {
                                setSelectedSession(session)
                                setSummaryRequested(false)
                              }}
                              className={`rounded-2xl border px-3 py-3 text-left transition ${
                                active
                                  ? 'border-cyan-200 bg-cyan-200/18 text-cyan-50'
                                  : 'border-white/8 bg-white/6 text-stone-200 hover:bg-white/10'
                              }`}
                            >
                              <p className="text-sm font-medium">{session.date}</p>
                              <p className="mt-1 text-xs opacity-80">{session.noteCount} notes</p>
                            </button>
                          )
                        })}
                      </div>

                      <div className="min-h-0 flex-1 rounded-[1.5rem] border border-amber-100/30 bg-[linear-gradient(180deg,rgba(250,244,226,0.98)_0%,rgba(241,226,193,0.92)_100%)] p-4 text-sm leading-7 text-stone-800 shadow-inner shadow-amber-950/10">
                        {summaryRequested
                          ? `AI summary is a short recap of the ideas captured on ${selectedSession.date}. This is an example of how the nightly thoughts could be summarized.`
                          : 'AI summary is shown here as an example after selecting a date.'}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}