# Second-half review — Mining Your First Business Process

**Lessons 14–20 Ready for Review · All 20 notes prepared · Practice Not Started**

## Explain the application as a connected system

The first part established the Claim, its history and the mined process. The second part connects the app's filtered Claim object set to the Machinery widget, then connects the widget's output to the claim table. This allows the investigator to move between a population, a process pattern and specific claims.

Start with [Workshop setup](15-setup-workshop-app.md) if the variable bindings are unclear. Then read [exploration](16-explore-your-process.md), [custom views](17-customize-workshop-app.md) and [alerts](18-create-alert.md). The important distinction is that a filter changes context, formatting changes presentation, and an automation evaluates a condition and runs an effect.

## Worked investigation

Suppose a current-state graph shows 250 claims in investigation. That figure alone does not establish a delay or its cause. Establish the observation time, data freshness and metric definition, then inspect durations and representative histories.

Now filter to high-risk=false. If the scenario's rule requires high risk for investigation, matching records deserve scrutiny. However, a Claim's risk flag may have changed after it entered investigation. Check event-time evidence before concluding that the routing decision was wrong when made.

Next consider a notification predicate: investigation AND high-risk=false. A claim entering investigation with false risk enters that set. A claim already in investigation whose risk flag changes from true to false also enters it. The condition therefore monitors set membership, not exclusively investigation-transition events. Neither case requires the claim to remain there for a minimum duration.

Finally, an alert arriving proves something about monitoring, not that the upstream routing logic has been corrected. The course configures detection and attention; it does not demonstrate a routing-rule repair.

## Questions to attempt before reading the cues

1. The table changes when you filter, but the graph does not. Which configuration do you trace?
2. Why can Historical Count exceed the number of unique claims?
3. Why is an old training fixture's current duration a poor measure of today's operating performance?
4. Under the illustrated colour rules, what happens at 99, 100, 101, 399 and 400?
5. Does a red node send a notification? What additional component is needed?
6. Does the alert identify claims older than 24 hours in investigation?
7. Why should live monitoring not be described as zero-latency delivery?
8. What evidence is missing between “the automation was saved” and “the alert works”?
9. What is missing between “we identified suspicious claims” and “we fixed the delay”?

## Answer cues

1. Trace Filtered Claim Objects into the Machinery widget and confirm the selected process/type. Rendering alone does not prove correct context.
2. Entries and transitions can repeat for one Claim; occurrence counts and distinct entity counts are different.
3. The fixture's open ages keep increasing with elapsed calendar time; they do not establish current production performance.
4. 99 matches Success; 101 and 399 match Danger. 100 and 400 match neither illustrated rule. The upper limits are exclusive.
5. No. Conditional formatting is visual; the Automate condition and notification effect are separate.
6. No. The demonstrated predicate has state and risk conditions, with no age threshold.
7. Data arrival, indexing, evaluation, execution and delivery each take time and can fail independently.
8. Verify a controlled qualifying change, the corresponding execution and notification delivery, plus a nonmatching control. Initial membership and re-entry behavior require separate checks.
9. Identify and correct the responsible behavior, then measure the outcome after the change. Correlation and monitoring alone are insufficient.

## Suggested review block

Within the two-hour daily limit, spend 30 minutes on app bindings, 35 on exploration and metric semantics, 30 on formatting and automation, and 25 on these questions. Repeat difficult sections in a later block. This allocation is a suggestion, not logged learner time or approval of the unresolved schedule exception.

Tell me which parts need clarification. Then use [PRACTICE.md](PRACTICE.md) to prepare a hands-on session after understanding review. Learn confirms 20/20 viewed and offers a [course certificate](https://verify.skilljar.com/c/g5mndqs6heeh); practical work and certification exams remain Not Started.
