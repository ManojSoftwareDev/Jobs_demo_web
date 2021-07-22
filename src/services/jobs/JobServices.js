
// Summary: This method calls api to get all jobs and returns it.
export async function getAllJobs() {

    try {

        // Request options to get jobs
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companySkills: true,
                dismissedListingHashes: [],
                fetchJobDesc: true,
                jobTitle: "Business Analyst",
                locations: [],
                numJobs: 20,
                previousListingHashes: []
            })
        };
        const response = await fetch('https://www.zippia.com/api/jobs/', requestOptions)
            .then(async response => await response.json());

        // Calls jobs api from node
        // const response = await fetch('http://localhost:9000/test/jobs')
        //     .then(async response => { return await response.json() })

        return await response;
    } catch (error) {
        return [];
    }
}