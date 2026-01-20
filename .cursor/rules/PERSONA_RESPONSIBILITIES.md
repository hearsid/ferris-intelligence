# .cursorrules

## 🛑 MANDATORY VERIFICATION PROTOCOL
You are prohibited from marking a task as "Complete" until you have successfully passed the following three checks. You must perform these actions autonomously using the terminal.

### 1. Compilation & Syntax Check
After applying any edit, IMMEDIATELY run the relevant build or check command to verify structural integrity.
- **For Node/JS:** Run `pnpm run dev` and `pnpm run build`.
- **For Rust:** Run `cargo check`.
- **For Python:** Run `python -m compileall .` or check via linter.

### 2. Runtime Verification
- Ensure the application service is running. If not, start it (e.g., `pnpm run dev`, `uvicorn main:app`, `cargo run`).
- Monitor the terminal output for compilation errors, stack traces, or "Address in use" errors.
- **Fix any errors found immediately.** Do not ask the user to fix them.

### 3. Endpoint/URL Verification
- Once the app is running, use `curl` to verify the application is accessible.
- Command: `curl -I http://localhost:<PORT>` (Replace <PORT> with the active port, e.g., 3000, 8000, 8080).
- **Success Criteria:** The response must show a `200 OK` or valid HTML response.
- If the curl fails (Connection refused/Timeout), assume the app is broken and debug.

## ⚠️ BEHAVIORAL OVERRIDES
- **DO NOT** ask "Shall I run the app now?" -> **Just run it.**
- **DO NOT** output code and say "It should work." -> **Prove it works.**
- If a check fails, analyze the error, apply a fix, and RESTART the verification loop.