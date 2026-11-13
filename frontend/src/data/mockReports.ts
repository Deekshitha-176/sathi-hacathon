export interface Biomarker {
  id: string;
  name: string;
  category: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'normal' | 'low' | 'high' | 'critical';
  simpleExplanation: string;
  whatItDoes: string;
  clinicalSignificance: string;
}

export interface MockReport {
  id: string;
  title: string;
  subtitle: string;
  labName: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  collectionDate: string;
  reportingDate: string;
  overallStatus: 'normal' | 'needs_attention' | 'review_recommended';
  plainSummary: string;
  keyTakeaways: string[];
  biomarkers: Biomarker[];
  doctorQuestions: string[];
  lifestyleTips: string[];
  disclaimer: string;
  rawTextPreview: string;
}

export const MOCK_REPORTS: Record<string, MockReport> = {
  cbc: {
    id: 'cbc',
    title: 'Complete Blood Count (CBC) with Differential',
    subtitle: 'Standard hematology screening for oxygen-carrying capacity and immune status',
    labName: 'Apex Healthcare Pathology Diagnostics',
    patientName: 'Priya Sharma',
    patientAge: 32,
    patientGender: 'Female',
    collectionDate: '12 Nov 2026, 08:30 AM',
    reportingDate: '12 Nov 2026, 02:45 PM',
    overallStatus: 'needs_attention',
    plainSummary:
      'Your blood report shows that your overall blood counts are largely balanced. However, your Hemoglobin and Red Blood Cell levels are slightly below the standard range, which is commonly associated with mild iron-deficiency anemia and can cause fatigue. Your white blood cells (infection fighters) and platelets (clotting cells) are healthy.',
    keyTakeaways: [
      'Hemoglobin (11.2 g/dL) is mildly below the standard reference range (12.0 - 15.5 g/dL).',
      'White Blood Cell count is optimal, indicating no active infection or inflammatory surge.',
      'Platelet levels are robust, indicating healthy blood clotting ability.',
      'Review these findings with your physician to discuss dietary iron intake or ferritin testing.'
    ],
    biomarkers: [
      {
        id: 'hb',
        name: 'Hemoglobin (Hb)',
        category: 'Red Blood Cells',
        value: '11.2',
        unit: 'g/dL',
        referenceRange: '12.0 - 15.5',
        flag: 'low',
        simpleExplanation: 'Hemoglobin is the oxygen carrier inside your red blood cells. A slightly low level means your cells might receive less oxygen, which can cause tiredness.',
        whatItDoes: 'Transports oxygen from lungs to all tissues and organs.',
        clinicalSignificance: 'Mildly reduced; often seen with insufficient iron or nutritional intake.'
      },
      {
        id: 'rbc',
        name: 'RBC (Red Blood Cell) Count',
        category: 'Red Blood Cells',
        value: '3.9',
        unit: 'mil/uL',
        referenceRange: '4.0 - 5.2',
        flag: 'low',
        simpleExplanation: 'Total number of red blood cells in your bloodstream. Slightly lower than typical for adult females.',
        whatItDoes: 'Carries hemoglobin throughout the cardiovascular network.',
        clinicalSignificance: 'Pairs with hemoglobin; supports mild microcytic assessment.'
      },
      {
        id: 'pcv',
        name: 'Hematocrit (PCV)',
        category: 'Red Blood Cells',
        value: '34.5',
        unit: '%',
        referenceRange: '36.0 - 46.0',
        flag: 'low',
        simpleExplanation: 'The percentage of your blood volume made up of red cells. Currently just under the standard threshold.',
        whatItDoes: 'Measures overall density of oxygen-bearing red blood cells.',
        clinicalSignificance: 'Consistent with lower hemoglobin levels.'
      },
      {
        id: 'wbc',
        name: 'Total Leukocyte Count (WBC)',
        category: 'Immune System',
        value: '6,800',
        unit: '/cumm',
        referenceRange: '4,000 - 11,000',
        flag: 'normal',
        simpleExplanation: 'Your body’s frontline immune defense against viruses and bacteria. Your count is right in the ideal zone.',
        whatItDoes: 'Fights pathogens and protects tissue against infections.',
        clinicalSignificance: 'Healthy baseline without signs of infection or inflammation.'
      },
      {
        id: 'neutro',
        name: 'Neutrophils',
        category: 'Immune System',
        value: '62',
        unit: '%',
        referenceRange: '40 - 75',
        flag: 'normal',
        simpleExplanation: 'The most common type of white blood cell, specialized in tackling bacterial invaders.',
        whatItDoes: 'Quick responders to bacterial exposure and tissue repair.',
        clinicalSignificance: 'Normal distribution within expected clinical limits.'
      },
      {
        id: 'platelets',
        name: 'Platelet Count',
        category: 'Clotting',
        value: '265,000',
        unit: '/cumm',
        referenceRange: '150,000 - 450,000',
        flag: 'normal',
        simpleExplanation: 'Tiny cell fragments that bundle together to stop bleeding when you have a cut or scrape.',
        whatItDoes: 'Form clots to seal broken blood vessels.',
        clinicalSignificance: 'Optimal concentration for regular hemostasis.'
      }
    ],
    doctorQuestions: [
      'My hemoglobin is 11.2 g/dL. Would you suggest checking my serum Ferritin or Vitamin B12 levels?',
      'Are there specific dietary changes or iron supplements that you recommend for my situation?',
      'Should I repeat this CBC in 6 to 12 weeks to monitor my red blood cell counts?'
    ],
    lifestyleTips: [
      'Incorporate iron-rich foods like dark leafy greens (spinach, methi), lentils, chickpeas, and beets.',
      'Pair iron-rich meals with Vitamin C (such as lemon juice, oranges, or amla) to boost mineral absorption.',
      'Avoid drinking black tea or coffee immediately with meals, as tannins can hinder iron absorption.'
    ],
    disclaimer:
      'ReportSaathi is an educational platform designed to decode complex laboratory terminology for patient understanding. It does not provide medical diagnoses, clinical interpretations, or treatment plans. Please consult your physician before making any healthcare decisions.',
    rawTextPreview: `METROPOLIS HEALTHCARE - CLINICAL PATHOLOGY DIVISION
Patient: Priya Sharma | Age: 32 | Gender: Female | Reg: MH-849204
Referred by: Dr. V. Nair, MD | Sample: Whole Blood EDTA

TEST PARAMETER                      RESULT   UNIT        REF INTERVAL     FLAG
-------------------------------------------------------------------------------
Hemoglobin (Hb)                     11.2     g/dL        12.0 - 15.5      LOW
RBC Count                           3.90     mil/uL      4.00 - 5.20      LOW
Packed Cell Volume (PCV)            34.5     %           36.0 - 46.0      LOW
Mean Corpuscular Volume (MCV)       84.0     fL          80.0 - 99.0      NORMAL
Total Leukocyte Count (WBC)         6,800    /cumm       4,000 - 11,000   NORMAL
Neutrophils                         62       %           40 - 75          NORMAL
Lymphocytes                         31       %           20 - 45          NORMAL
Platelet Count                      265,000  /cumm       150,000 - 450,000 NORMAL
`
  },

  lipid: {
    id: 'lipid',
    title: 'Lipid & Cardiovascular Risk Profile',
    subtitle: 'Fasting lipid panel assessing blood fats, good cholesterol, and cardiovascular markers',
    labName: 'CarePlus Diagnostic Laboratories',
    patientName: 'Ramesh Patel',
    patientAge: 46,
    patientGender: 'Male',
    collectionDate: '10 Nov 2026, 07:45 AM',
    reportingDate: '10 Nov 2026, 01:15 PM',
    overallStatus: 'review_recommended',
    plainSummary:
      'Your lipid panel indicates elevated Total Cholesterol and LDL ("bad") cholesterol, along with mildly raised Triglycerides. Your HDL ("good") cholesterol is slightly lower than ideal. These findings suggest that your cardiovascular circulation could benefit from heart-healthy nutrition and active physical exercise.',
    keyTakeaways: [
      'Total Cholesterol (228 mg/dL) is in the borderline elevated range (desirable is below 200 mg/dL).',
      'LDL Cholesterol (145 mg/dL) is higher than recommended (ideal is below 100 mg/dL).',
      'Triglycerides (175 mg/dL) are mildly elevated, often tied to refined carbohydrates or dietary fats.',
      'Lifestyle modifications (dietary adjustments and brisk aerobic exercise) can significantly improve these numbers.'
    ],
    biomarkers: [
      {
        id: 'tc',
        name: 'Total Cholesterol',
        category: 'Lipids',
        value: '228',
        unit: 'mg/dL',
        referenceRange: '< 200',
        flag: 'high',
        simpleExplanation: 'The sum of all cholesterol forms in your blood. Higher numbers can gradually lead to buildup inside arteries.',
        whatItDoes: 'Used by the body to build cell membranes and essential hormones.',
        clinicalSignificance: 'Above desirable ceiling; indicates increased atherosclerotic risk.'
      },
      {
        id: 'ldl',
        name: 'LDL Cholesterol ("Bad" Cholesterol)',
        category: 'Lipids',
        value: '145',
        unit: 'mg/dL',
        referenceRange: '< 100',
        flag: 'high',
        simpleExplanation: 'Known as "bad" cholesterol because excess amounts can deposit on artery walls as plaque.',
        whatItDoes: 'Delivers cholesterol to cells throughout the body.',
        clinicalSignificance: 'Elevated; primary target for dietary and cardiovascular lifestyle management.'
      },
      {
        id: 'hdl',
        name: 'HDL Cholesterol ("Good" Cholesterol)',
        category: 'Lipids',
        value: '42',
        unit: 'mg/dL',
        referenceRange: '> 45',
        flag: 'low',
        simpleExplanation: 'Known as "good" cholesterol because it acts like a scavenger, carrying excess cholesterol back to the liver to be cleared.',
        whatItDoes: 'Protects blood vessels by clearing free cholesterol deposits.',
        clinicalSignificance: 'Mildly sub-optimal; regular physical activity helps increase HDL levels.'
      },
      {
        id: 'trig',
        name: 'Triglycerides',
        category: 'Lipids',
        value: '175',
        unit: 'mg/dL',
        referenceRange: '< 150',
        flag: 'high',
        simpleExplanation: 'The most common type of fat in your body, derived from surplus dietary calories, sugars, and oils.',
        whatItDoes: 'Stores unused calories and delivers energy to your muscles.',
        clinicalSignificance: 'Slightly high; responds quickly to reduced sugar and alcohol intake.'
      },
      {
        id: 'ratio',
        name: 'Total Cholesterol / HDL Ratio',
        category: 'Risk Ratios',
        value: '5.4',
        unit: 'ratio',
        referenceRange: '< 4.5',
        flag: 'high',
        simpleExplanation: 'A mathematical comparison between overall cholesterol and your protective HDL. A lower ratio is safer.',
        whatItDoes: 'Provides an integrated estimate of overall cardiovascular health risk.',
        clinicalSignificance: 'Higher proportion of risk-bearing lipid fractions.'
      }
    ],
    doctorQuestions: [
      'Given my LDL level of 145 mg/dL, should we begin with a 3-month lifestyle trial or consider preventive medication?',
      'Would you recommend an hs-CRP (cardiac inflammation) or Coronary Calcium test for a complete risk picture?',
      'What specific target LDL level should I aim for based on my age and family medical history?'
    ],
    lifestyleTips: [
      'Focus on soluble fiber (oats, flaxseeds, beans, apples) which binds to cholesterol in the digestive tract.',
      'Replace saturated and trans fats (deep-fried snacks, excess butter) with heart-healthy fats (olive oil, walnuts, chia seeds).',
      'Aim for at least 150 minutes of moderate aerobic exercise (brisk walking, cycling, swimming) per week.'
    ],
    disclaimer:
      'ReportSaathi is purely an educational resource intended to explain medical terms and lab metrics. It is not a substitute for clinical diagnosis or physician consultation.',
    rawTextPreview: `CAREPLUS DIAGNOSTIC LABORATORIES
Patient: Ramesh Patel | Age: 46 | Gender: Male | Ref: Dr. K. Agarwal
Sample: Fasting Serum (12h Fasting confirmed)

TEST NAME                       RESULT   UNIT     DESIRABLE RANGE     FLAG
--------------------------------------------------------------------------
Total Cholesterol               228      mg/dL    < 200               HIGH
Triglycerides                   175      mg/dL    < 150               HIGH
HDL Cholesterol (Good)          42       mg/dL    > 45                LOW
LDL Cholesterol (Bad)           145      mg/dL    < 100               HIGH
VLDL Cholesterol                35       mg/dL    < 30                HIGH
Total Chol / HDL Ratio          5.4      ratio    < 4.5               HIGH
Non-HDL Cholesterol             186      mg/dL    < 130               HIGH
`
  },

  metabolic: {
    id: 'metabolic',
    title: 'Comprehensive Metabolic & Kidney Panel',
    subtitle: 'Evaluation of blood sugar regulation, kidney filtration, and vital electrolytes',
    labName: 'MetroHealth PathLabs & Research',
    patientName: 'Anand Kumar',
    patientAge: 52,
    patientGender: 'Male',
    collectionDate: '11 Nov 2026, 08:15 AM',
    reportingDate: '11 Nov 2026, 03:00 PM',
    overallStatus: 'needs_attention',
    plainSummary:
      'Your kidney filtration markers (Creatinine and eGFR) and electrolytes (Sodium and Potassium) are in an excellent, healthy range. However, your Fasting Blood Glucose is elevated at 116 mg/dL, which indicates impaired fasting glucose (often called pre-diabetes). Early lifestyle focus on daily movement and nutrition can help normalize blood glucose.',
    keyTakeaways: [
      'Fasting Glucose (116 mg/dL) is higher than normal (70 - 99 mg/dL), indicating impaired fasting regulation.',
      'Kidney function is strong: Creatinine (0.95 mg/dL) and eGFR (92 mL/min) are completely normal.',
      'Electrolyte balance (Sodium and Potassium) is stable and well-regulated.',
      'Discuss an HbA1c (3-month blood sugar average) test with your doctor to clarify glucose trends.'
    ],
    biomarkers: [
      {
        id: 'glu',
        name: 'Fasting Blood Glucose',
        category: 'Metabolic & Sugar',
        value: '116',
        unit: 'mg/dL',
        referenceRange: '70 - 99',
        flag: 'high',
        simpleExplanation: 'The level of sugar circulating in your blood after an overnight fast (8-12 hours).',
        whatItDoes: 'Supplies immediate fuel and energy to all living cells.',
        clinicalSignificance: 'Above standard threshold (100-125 is impaired fasting glucose / pre-diabetes).'
      },
      {
        id: 'creat',
        name: 'Serum Creatinine',
        category: 'Kidney Function',
        value: '0.95',
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30',
        flag: 'normal',
        simpleExplanation: 'A waste byproduct of normal muscle wear that healthy kidneys filter out through urine.',
        whatItDoes: 'Serves as an accurate indicator of kidney filtration efficiency.',
        clinicalSignificance: 'Optimal; kidneys are filtering blood cleanly.'
      },
      {
        id: 'egfr',
        name: 'eGFR (Estimated Glomerular Filtration Rate)',
        category: 'Kidney Function',
        value: '92',
        unit: 'mL/min/1.73m²',
        referenceRange: '> 60',
        flag: 'normal',
        simpleExplanation: 'Estimates how many milliliters of blood your kidneys clean every minute.',
        whatItDoes: 'Calculates primary filtration rate based on age, gender, and creatinine.',
        clinicalSignificance: 'Above 90 is considered excellent kidney filtration.'
      },
      {
        id: 'na',
        name: 'Serum Sodium (Na+)',
        category: 'Electrolytes',
        value: '140',
        unit: 'mEq/L',
        referenceRange: '136 - 145',
        flag: 'normal',
        simpleExplanation: 'An essential electrolyte that maintains fluid balance and blood pressure.',
        whatItDoes: 'Regulates water distribution and cellular electrical impulses.',
        clinicalSignificance: 'Balanced.'
      },
      {
        id: 'k',
        name: 'Serum Potassium (K+)',
        category: 'Electrolytes',
        value: '4.4',
        unit: 'mEq/L',
        referenceRange: '3.5 - 5.1',
        flag: 'normal',
        simpleExplanation: 'Critical electrolyte that controls heart muscle rhythm and nerve transmissions.',
        whatItDoes: 'Ensures rhythmic heartbeat contractions and proper muscle reflexes.',
        clinicalSignificance: 'Normal cardiac safety range.'
      }
    ],
    doctorQuestions: [
      'My fasting blood sugar is 116 mg/dL. Would you recommend checking my HbA1c to see my 3-month average?',
      'Could stress, poor sleep, or an incomplete fasting duration have influenced this result?',
      'What dietary strategy or physical activity routine should I prioritize to bring this back into the double digits?'
    ],
    lifestyleTips: [
      'Take a 15-minute gentle walk shortly after main meals to help muscles absorb glucose from the blood.',
      'Swap refined white flour (maida) and sugary drinks for whole grains (brown rice, millets, quinoa) and water.',
      'Prioritize consistent sleep timing, as irregular sleep patterns can elevate morning cortisol and glucose.'
    ],
    disclaimer:
      'ReportSaathi is strictly for educational purposes and patient communication clarity. It does not replace clinical evaluation or medical guidance from a licensed physician.',
    rawTextPreview: `METROHEALTH PATHLABS & RESEARCH
Patient: Anand Kumar | Age: 52 | Gender: Male | ID: MH-2026-993
Test Date: 11-Nov-2026 | Fasting: 10 Hours

TEST NAME                       VALUE    UNIT         NORMAL RANGE     FLAG
----------------------------------------------------------------------------
Fasting Blood Glucose           116      mg/dL        70 - 99          HIGH
Serum Creatinine                0.95     mg/dL        0.70 - 1.30      NORMAL
eGFR (CKD-EPI)                  92       mL/min       > 60             NORMAL
Serum Sodium                    140      mEq/L        136 - 145        NORMAL
Serum Potassium                 4.4      mEq/L        3.5 - 5.1        NORMAL
Blood Urea Nitrogen (BUN)       16       mg/dL        7 - 20           NORMAL
`
  }
};
