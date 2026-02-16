#!/usr/bin/env node
/**
 * Claude Hook: Block direct Storybook commands
 * Reminds to use /storybook-manager instead.
 */

let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const command = data.tool_input?.command || '';

    // Patterns that indicate direct storybook commands
    const blockedPatterns = [
      /npm\s+run\s+storybook(?!\s*-manager)/i,
      /npx\s+storybook\s+dev/i,
      /npx\s+storybook\s+build/i,
      /npm\s+run\s+sb:start/i,
      /npm\s+run\s+sb:stop/i,
    ];

    // Allow storybook-manager commands (direct and via npm scripts)
    const allowedPatterns = [
      /storybook-manager/i,
      /node\s+scripts\/storybook-manager/i,
      /npm\s+run\s+sb:/i,  // npm run sb:start, sb:stop, sb:status, sb:stop-all
    ];

    const isAllowed = allowedPatterns.some(pattern => pattern.test(command));
    if (isAllowed) {
      process.exit(0);
    }

    const isBlocked = blockedPatterns.some(pattern => pattern.test(command));
    if (isBlocked) {
      const decision = {
        decision: "block",
        reason: `⚠️  Direct Storybook commands zijn niet toegestaan.

Gebruik in plaats daarvan /storybook-manager:
  /storybook-manager start [port]  - Start Storybook
  /storybook-manager stop [port]   - Stop Storybook
  /storybook-manager status        - Bekijk actieve instances`
      };
      console.log(JSON.stringify(decision));
      process.exit(0);
    }

    process.exit(0);
  } catch (e) {
    process.exit(0);
  }
});
