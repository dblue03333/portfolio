---
title: "What 40 ML Studies in Geriatric Care Reveal About External Validation"
slug: "ml-geriatric-care-scoping-review"
date: "2026-11-27"
publish_at: "2026-11-27"
track: "paper"
status: "ready"
lang: "en"
summary: "Reading notes on Mangio et al. (2026): out of 40 ML studies using multidimensional geriatric assessment data, zero reported external validation, only 4 checked calibration, and none evaluated real-world care allocation impact."
tags: [paper-notes, ml-evaluation, healthcare-ai, calibration]
source_url: "https://doi.org/10.1016/j.ijmedinf.2025.106181"
source_label: "Mangio et al. (2026), Int. J. Medical Informatics"
related_work: "healthlab"
related_work_label: "HealthLab Evidence Intelligence"
math: false
---

> **Core takeaway:** High internal AUC on retrospective clinical tables does not mean a model is ready to guide real-world geriatric care allocation. In a scoping review of 40 studies, the gap sits between *prediction* and *decision-making*.

## 1. Scope of the Review

Mangio et al. (2026) screened **964 records** across 6 databases (2012–2024; included studies published 2012–2023) to map how machine learning is applied to **multidimensional geriatric assessment data** for adults aged **65+**.

- **Included:** 40 primary ML studies predicting outcomes such as falls, frailty, functional decline, mortality, hospital readmission, and service utilization (emergency admission, nursing-home placement, rehabilitation use).
- **Excluded:** 87 remote-monitoring / telemonitoring studies and grey literature — so every count below applies specifically to these 40 multidimensional-assessment studies.

## 2. Prediction vs. Action: Key Numbers

| Dimension | Observation across the 40 studies | Why it matters in practice |
|---|---|---|
| **External validation** | **0 / 40** studies | Models were never tested on an independent patient cohort outside the source setting. |
| **Calibration checks** | **4 / 40** studies | Predicted risk probabilities can be poorly calibrated even when ranking AUC looks strong. |
| **Local explainability** | **3–4** studies used SHAP | Clinicians rarely receive case-level reasoning they can audit against assessment items. |
| **Algorithm comparison** | XGBoost best in **8 / 25** comparative studies | Tree ensembles are competitive, not magically dominant across heterogeneous clinical tables. |
| **Real-world impact eval** | **0 / 40** studies | None measured whether deploying the model improved staffing, triage, or patient outcomes. |

*(Correction to my first pass: my initial quick note flagged missing-data handling as "often weak," whereas the review actually notes missing-data issues were "less widespread" and appeared in only a few studies.)*

## 3. Why Deployment Breaks Across Hospitals

Even when a model performs well internally, transferring it from **Hospital A** to **Hospital B** (or to low- and middle-income settings) runs into structural mismatches:

1. **Assessment heterogeneity:** Hospitals and care facilities use different geriatric assessment instruments and schemas, breaking naive feature pipelines.
2. **Setting skew:** Out of the 40 studies, **21** were community-based and **13** were hospital-based, while only **2** studied home care and **2** studied nursing homes.
3. **Geography & age-cutoff mismatch:** Most studies came from high-income settings (e.g., US 9, Canada 5, France 4, Japan 4), with **zero studies from Vietnam**. The authors also note that a strict **65+ cutoff** does not align well with lower-income regions where older-adult care thresholds often begin at **55–60** (Vietnam defines older adults from **60+**).

## 4. Clinical & Engineering Takeaway

The authors recommend moving beyond pure discrimination metrics toward **decision-focused evaluation** (such as net benefit and decision-curve analysis), because geriatric care teams operate under tight staffing and resource constraints. Only one example (Kuo 2019) integrated predictions via an API into a downstream workflow.

For building healthcare evidence and triage tools, three checks belong in every evaluation checklist:

- Require **calibration curves** alongside AUC before trusting probability thresholds.
- Separate **offline internal metrics** from **external cohort transfer** — never extrapolate one into the other.
- Map predictions to concrete **resource decisions** (who gets reviewed, scheduled, or escalated) before claiming clinical utility.

## 5. Open Questions to Follow Up

- **External validation updates (2024–2026):** Check newer studies (such as recent 2026 multi-center cohorts) to verify where external validation is starting to appear.
- **Precision vs. workload:** Look closely at home-care demand models where high AUC still yields low precision — and what false-positive rate care coordinators can actually absorb.
