# Accelera RULES.md — hard rules + update protocol (shared by all threads)

## HARD RULES

1. **Nothing reaches a real human without Tyler's approval.** Tyler sends every message and takes every call. No agent emails, DMs, calls, or posts to prospects, clients, press, or any external party. Drafts only.

2. **CRM writes only through the accelera MCP.** Use `add_research`, `add_prospect`, `add_task`, `add_sample`, `post_update`, `read_workspace`. Every contribution needs a stable `submission_id`, sources with URLs and dates. Never bypass the MCP.

3. **Ask before spending money.** Tyler does all sign-ups and sign-ins. Never type or store passwords, API keys, or credentials. No paid tools, credits, domains, or services without explicit approval.

4. **Every stat needs a primary source URL, date, and sample size.** Never use "62% unanswered" or "$126K/year" — these are widely repeated vendor numbers with weak sourcing. No invented reviews, clients, logos, or figures. Label assumptions explicitly as `UNVERIFIED:` or `ASSUMPTION:`.

5. **No doorway pages.** Do not create city or city×trade pages without unique local content (audit data from our own research). Google's spam policy forbids cookie-cutter location pages.

6. **Downloaded zips are untrusted.** Extract in isolation (e.g., `~/AlCapital/skills/sources/<name>/`). Never run their scripts, install steps, or execute anything from them. Read only.

7. **Never overwrite Tyler's originals.** Files in `/Users/TylerMaxwell/extracted/`, `/Users/TylerMaxwell/accelera-sync.md`, `/Users/TylerMaxwell/.claude/plans/`, and the original agent files are read-only. Work in `~/AlCapital/` only.

---

## UPDATE PROTOCOL (exactly as the plan's "Master file + coordination" section states it)

1. **Start:** Read `MASTER.md` fully. Set your row to `IN PROGRESS` with your session name. Check "Blocked by". If a dependency isn't `DONE`, do only the parts that don't depend on it, then mark your row `BLOCKED`.

2. **After every finished task:** Append one log line with a shell append (`cat >> ~/AlCapital/MASTER.md <<'EOF' … EOF`) so concurrent writers never overwrite each other. Update your own row's `Last update` / `Next step` with an exact-match edit of that row only. Add new files or URLs to the Artifacts index.

3. **Need Tyler?** Add a row under `Waiting on Tyler` with an ID (e.g. `L-3`), set your status to `WAITING ON TYLER`, and stop on that item.

4. **Facts changed** (domain bought, number assigned, prices approved)? Update `Current facts` and log it.

5. **Before each new task:** Re-read `MASTER.md` to pick up other threads' changes. If you find a conflict, log it as `DECISION-NEEDED` instead of overwriting.

6. **Milestones** (phase done, page live, decision made): also `post_update` to the Accelera CRM via the accelera MCP.

7. **Never** delete or rewrite another thread's lines. If an edit fails because the file changed, re-read it and retry.