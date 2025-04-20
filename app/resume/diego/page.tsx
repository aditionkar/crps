import React from "react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#f2fafb] p-8 text-[#2e657a] font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#78bed8] p-6">
          <h1 className="text-3xl font-bold text-white">Diego Alvarez</h1>
          <p className="text-[#e3fbff]">Data Scientist</p>
          <p className="text-[#c6f6ff]">diego.alvarez@devloop.org</p>
          <p className="text-[#c6f6ff]">+91 98765 43210</p>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Education</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>B.Sc in Data Science - SRM University, Kattankulathur (2019 - 2023)</li>
              <li>CGPA: 9.2 / 10</li>
              <li>Relevant Coursework: Machine Learning, Statistics, Data Mining, Big Data Analytics, Deep Learning</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Technical Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Python", "R", "SQL", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn", "Data Visualization", "BigQuery", "Spark"].map((skill) => (
                <span
                  key={skill}
                  className="bg-[#c6f6ff] text-[#2e657a] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Projects</h2>
            <ul className="mt-2 space-y-3">
              <li>
                <h3 className="font-semibold">Predictive Analytics for E-commerce</h3>
                <p className="text-sm text-[#548d97]">
                  Built a machine learning model to predict user churn and buying behavior using transactional and behavioral data.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">COVID-19 Data Dashboard</h3>
                <p className="text-sm text-[#548d97]">
                  Designed an interactive dashboard using Python and Dash to visualize COVID trends across India in real-time.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">Stock Price Prediction</h3>
                <p className="text-sm text-[#548d97]">
                  Implemented LSTM-based deep learning models to forecast short-term stock prices with high accuracy.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Certifications</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>IBM Data Science Professional Certificate - Coursera</li>
              <li>Machine Learning - Stanford University (Andrew Ng)</li>
              <li>Deep Learning Specialization - deeplearning.ai</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Achievements</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Top 5 finalist - Kaggle Student Data Challenge 2022</li>
              <li>Presented paper at International Conference on Data Science 2023</li>
              <li>Secured research internship at TCS Innovation Labs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Extracurricular Activities</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Lead, Data Science Club</li>
              <li>Mentor for junior data science learners on DataCamp</li>
              <li>Volunteer at Open Data Day events</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Interests</h2>
            <p className="mt-2 text-[#2e657a]">Data Visualization, Research, Sports Analytics, Chess, Podcasting</p>
          </section>
        </div>
      </div>
    </div>
  );
}
