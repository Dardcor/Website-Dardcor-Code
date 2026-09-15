# Security Audit Methodology Summary

Adopted from C:\Users\Dardcor\.gemini\config\skills\security-audit\SKILL.md:
1. Confirm dynamically when you can: Extract suspect code into minimal standalone harness and test hypotheses in isolation.
2. Attack classes to test:
   - Input validation & URL parsing (scheme manipulation, host parsing ambiguity, open redirects)
   - Prototype pollution & payload corruption
   - Reverse tabnabbing (`rel="noopener noreferrer"`)
   - Type coercion and runtime boundary checks
3. Severity and blast radius analysis.
