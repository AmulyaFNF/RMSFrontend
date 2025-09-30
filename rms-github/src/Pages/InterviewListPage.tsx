import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Interview {
  interviewId: number;
  applicationId: number;
  jobTitle?: string;
  scheduledTime: string;
  teamsLink?: string;
}

export default function InterviewListPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const navigate = useNavigate();
  const APIBASE = "http://localhost:5109";
  //sessionStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJpbnRlcnZpZXdlckBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJJbnRlcnZpZXdlciIsImV4cCI6MTc1OTIyOTA2NCwiaXNzIjoiUk1TX0JhY2tlbmQiLCJhdWQiOiJSTVNfQmFja2VuZFVzZXJzIn0.O_onevedZv89kdoLwZjd4OxL9wZ1Mz00C1nHktlrnyU');
  const token = sessionStorage.getItem("token");
  const interviewerId = sessionStorage.getItem("userId");
  

  useEffect(() => {
    async function fetchInterviews() {
      if (!token || !interviewerId) return;
      try {
        const res = await fetch(
          `${APIBASE}/api/interviews/interviewer`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data: Interview[] = await res.json();
          setInterviews(
            data.sort(
              (a, b) =>
                new Date(b.scheduledTime).getTime() -
                new Date(a.scheduledTime).getTime()
            )
          );
        } else {
          console.error("Failed to fetch interviews");
        }
      } catch (err) {
        console.error("Error fetching interviews", err);
      }
    }
    fetchInterviews();
  }, [token, interviewerId]);

  function handleView(interview: Interview) {
    // Store interviewId in sessionStorage
    sessionStorage.setItem("interviewId", interview.interviewId.toString());
    // Navigate to application details page
    navigate(`/application/${interview.applicationId}`);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Scheduled Interviews</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Application ID</th>
            <th>Job Title</th>
            <th>Scheduled Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((intv) => (
            <tr key={intv.interviewId}>
              <td>{intv.applicationId}</td>
              <td>{intv.jobTitle ?? "N/A"}</td>
              <td>{new Date(intv.scheduledTime).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleView(intv)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}