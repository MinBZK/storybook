export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Custom type-enum to include 'a11y' for accessibility commits
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code formatting
        'refactor', // Code refactoring
        'test',     // Tests
        'chore',    // Maintenance
        'perf',     // Performance
        'a11y',     // Accessibility
        'ci',       // CI/CD changes
        'build',    // Build system
        'revert',   // Revert commits
      ],
    ],
    // Allow longer subjects for descriptive commits
    'subject-max-length': [2, 'always', 100],
    // Require lowercase type
    'type-case': [2, 'always', 'lower-case'],
    // Subject should be lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // No period at end of subject
    'subject-full-stop': [2, 'never', '.'],
  },
};
