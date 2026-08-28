# Data Notice

All data in this project is synthetic and clearly labeled.

Scenarios come from the challenge's `resources/data/homelessness-handoff-scenarios.csv`, marked with `is_synthetic = true` and `capacity_is_not_live = true`. The service directory (`data/services-directory.synthetic.json`) contains fictional providers mapped to real Birmingham service categories. These are not real organizations and do not reflect live service capacity. In production, the directory would be sourced from and maintained by One Roof and United Way 211.

No entry is presented as real, live, or authoritative. This project:
- Uses no real client data, HMIS records, or personally identifiable information
- Performs no risk or vulnerability scoring
- Makes no live-capacity claims
- Includes a required human-confirmation point before any real handoff

Any reused copy of the synthetic CSV must retain the `is_synthetic` label and `capacity_is_not_live` flag to preserve this declaration across deployments.
