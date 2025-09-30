import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface ApplicationDetails {
  applicationId: number;
  firstName: string;
  lastName: string;
  email: string;
  resumePath: string;
  keywordScore: number;
  currentRound: number;
}

interface Feedback {
  comments: string;
  score: string;
  status: string;
}

export default function ApplicationDetailsPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);
  const [feedback, setFeedback] = useState<Feedback>({
    comments: "",
    score: "",
    status: "Accepted",
  });

  const APIBASE = "http://localhost:5109";
  const token = sessionStorage.getItem("token");
  const interviewId = sessionStorage.getItem("interviewId");

  useEffect(() => {
    async function fetchApplicationDetails() {
      if (!token || !applicationId) return;
      try {
        const res = await fetch(
          `${APIBASE}/api/interviewer/applications/${applicationId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data: ApplicationDetails = await res.json();
          setApplicationDetails(data);
        } else {
          console.error("Failed to fetch application details");
        }
      } catch (err) {
        console.error("Error fetching application details", err);
      }
    }
    fetchApplicationDetails();
  }, [token, applicationId]);

  async function handleSubmitFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !interviewId || !applicationId) return;
    
    // Map Accepted to 0, Rejected to 1
    const result = feedback.status === "Accepted" ? 0 : 1;

    const payload = {
      comments: feedback.comments,
      score: parseInt(feedback.score, 10),
      status: feedback.status,
      applicationId: Number(applicationId),
      interviewId: Number(interviewId),
      result: result
    };

    try {
      const res = await fetch(`${APIBASE}/api/feedback/${interviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Feedback submitted successfully!");
        setFeedback({ comments: "", score: "", status: "Accepted" });
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (err) {
      alert("Error submitting feedback.");
      console.error("Error submitting feedback", err);
    }
  }

  if (!applicationDetails) return <div>Loading application details...</div>;

  return (
    <div className="container mt-4">
      <h3>Application Details</h3>
      <p><strong>Application ID:</strong> {applicationDetails.applicationId}</p>
      <p><strong>Applicant Name:</strong> {applicationDetails.firstName} {applicationDetails.lastName}</p>
      <p><strong>Email:</strong> {applicationDetails.email}</p>
      <p><strong>Resume:</strong> <a href={applicationDetails.resumePath} target="_blank" rel="noreferrer">View Resume</a></p>
      <p><strong>Keyword Score:</strong> {applicationDetails.keywordScore}</p>
      <p><strong>Current Round:</strong> {applicationDetails.currentRound}</p>
      <Link to="/">Back to Interviews</Link>
      
      <hr />
      <h5>Submit Feedback</h5>
      <form onSubmit={handleSubmitFeedback}>
        <div className="mb-3">
          <label className="form-label">Comments</label>
          <textarea
            className="form-control"
            value={feedback.comments}
            onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Score (0-10)</label>
          <input
            type="number"
            min={0}
            max={10}
            className="form-control"
            value={feedback.score}
            onChange={(e) => setFeedback({ ...feedback, score: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Decision</label>
          <select
            className="form-select"
            value={feedback.status}
            onChange={(e) => setFeedback({ ...feedback, status: e.target.value })}
          >
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}