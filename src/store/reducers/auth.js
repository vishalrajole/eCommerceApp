import { AUTHENTICATE } from "../actions/auth";

// test@test.com 123456
const initialState = {
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjczNzVhZmY3MGRmZTNjMzNlOTBjYTM2OWUzYTBlZjQxMzE3MmZkODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWNvbW1lcmNlYXBwLTI3NzEwIiwiYXVkIjoiZWNvbW1lcmNlYXBwLTI3NzEwIiwiYXV0aF90aW1lIjoxNjAwNjY3MzgwLCJ1c2VyX2lkIjoiZ0FvS01RT0J3QVNWYXZrY1d1bG4wRkw1QVAyMiIsInN1YiI6ImdBb0tNUU9Cd0FTVmF2a2NXdWxuMEZMNUFQMjIiLCJpYXQiOjE2MDA2NjczODAsImV4cCI6MTYwMDY3MDk4MCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.LXDy2mWrHETJ5hX6NgwMT66NNNaJtanvCRIHWVM1e3agRMSFp2R1AzHHXRbaWURDrXc07njQ14j7iyw8A4vRDpAkcrcSjlsprsu5Eta_t2MfVgUCooY2uEJ3VgGVV0Ts7xw5Llf-h6PkY3ztSHAgrpjvZEisYWpOo9Y4q3O2_RPt9sRcH8Xh01Nljyp8_0yp1cJ0zgfAWp96sa4vvsZ5oTorZrCSGZpijZRJPjwf3FZ3i33ISEUhgxvkDg8_0ro1pzVqho2XEB0vMpw9lkwetSNguJzN9ch8sGPaDxNLGA1Uk6lpS9XpN6M12j5F5G24wL2l4P771p88LLqu3wa-fQ",
  userId: "gAoKMQOBwASVavkcWuln0FL5AP22",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
