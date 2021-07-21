
// Summary: This method calls api to get all jobs and returns it.
export async function getAllJobs() {

    try {

        // Calls jobs api from node
        const response = await fetch('http://localhost:9000/test/jobs')
            .then(async response => { return await response.json() })

        return await response;
    } catch (error) {
        return [];
    }
}