const AUTH_TOKEN_KEY = 'auth_token';
const token=localStorage.getItem(AUTH_TOKEN_KEY);
const url="https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql"


export async function fetchUserProfile(query) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {}
      })
    });

    if (!response.ok) {
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      // GraphQL errors returned from API
      console.error('GraphQL error:', result.errors);
      return
    } 
       return result
  } catch (error) {
    // Network or fetch-related error
    console.error('Request failed:', error);
  }
}
