## Dev servers and worktrees

Every branch has its own git worktree, tmux session and agent. The session is
`leure-coffee-cost/<branch>` and its panes are `agent`, `frontend`, `shell`.

- Ports are per worktree and live in `.env.worktree`, which every pane exports.
  Never hardcode a port, read `FRONTEND_PORT` from the environment.
- The dev servers are already running in their own panes. Do not start them
  again. Read `.wt-logs/*.log` to see what they are doing, the sandbox cannot
  reach the tmux socket.
- `wtx curl <family> [path] [curl args]` is how you reach them. It fills in this
  worktree's port and never prompts, whatever the method: `wtx curl frontend /`.
  Plain curl to localhost works for a GET and prompts past that.
- Work on this branch only. Never push `main`. When the work is ready, say
  so and a human runs `wtx land <branch>` from the main checkout.
- A pre-push hook enforces this. If it refuses a push, that is the design, not a
  bug to work around.
- Kill only your own servers. A `pkill -f vite` style cleanup kills every other
  worktree's servers too. Kill the process tree you started, or the port.
