import React, { Component } from 'react';
import { getAllJobs } from '../../services/jobs/JobServices';
import { JobCard } from './JobCard';
import { Container, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

class Jobs extends Component {

    constructor() {
        super();

        // State to get/set value
        this.state = {
            records: [],
            filterdRecords: [],
            searchCompanyName: ''
        }

        // Binds methods which triggers on button click which is for filter jobs based on company name
        this.filterByCompanyName = this.filterByCompanyName.bind(this);
    }

    componentDidMount() {

        // Set initial job records
        this.setJobsRecords();
    }

    // Summary: This method sets responce to states. 
    // Parameter records would have all jobs in it for future filter purpose.
    // Parameter filterdRecords would have initially 10 records in it. 
    async setJobsRecords() {

        // Calls method to get jobs
        let result = await this.getAllJobsData();

        // Sets states if job returns data
        if (result) {
            this.setState({
                records: result.jobs,
                filterdRecords: result.jobs.slice(0, 10),
            })
        }
    }

    // Summary: This method gets a list of jobs and returns it.
    async getAllJobsData() {

        // Searvice call to get a list of jobs
        return await getAllJobs()
            .then(data => {
                return data;
            });
    }

    // Summary: This method returns a filtered list of jobs. This is centralized method
    // to accomplish both search criteria based on search case passed.
    // Search case 1 = filter by company name and search case 2 = jobs posted in last 7 days.
    renderJobsListing(searchCase = 0, searchValue = "") {

        let filteredData = [];

        switch (searchCase) {
            case 1:
                if (searchValue != null) {

                    // Filters data based on company name
                    // First make company name and search text in lower to match it in any text that user have passed
                    // We are filtering records from already exist records we get from initial call to prevent unnecessory API call. This can be changed
                    // based on requirement to get fresh API data every time
                    filteredData = this.state.records.filter(function (job) {
                        return job.companyName.toLowerCase().includes(searchValue.toLowerCase());
                    })

                    // Set filtered data to state with limit 10.
                    this.setState({ filterdRecords: filteredData.slice(0, 10) });
                }
                break;
            case 2:

                // This filters last 7 days records based on postedDate
                // We are doing it by substring, Which will check it posted day is in hours ago or days, if it days less than or equals to 7,
                // it would return result. This can be accomplised by moment(this is library to manage date/time) as well
                filteredData = this.state.records.filter(function (job) {
                    return job.postedDate.substr(-5, 1) == 'h' ? true : job.postedDate.substr(-5, 1) == 'd' ? job.postedDate.substr(0, job.postedDate.length - 5) <= 7 ? true : false : false;
                })

                // Set filtered data to state with limit 10.
                this.setState({ filterdRecords: filteredData.slice(0, 10) });
                break;
            default:
                break;

        }
    }

    // Summary: This method calls function to set filtered list based on class name search.
    filterByCompanyName() {

        // This has 2 paramters, first is case value which is 1 to filter data based on company name 
        // and second parameter is search text for company name based on which we need to filter job
        this.renderJobsListing(1, this.state.searchCompanyName)
    }

    // Summary: This method sets state for searched company name value.
    setCompanyNameFilterValue = e => {
        this.setState({ searchCompanyName: e.target.value });
    };

    // Summary: This method render the jobs which are posted in last 7 days.
    filterLastSevenDaysJob() {

        // This has 1 pamaters with case value 2, which is to filter data based on posted date
        this.renderJobsListing(2);
    }

    render() {

        return (
            <Container className="p-5">
                <Row xs={1} className="g-4 p-4">
                    <Col md={1}>Filters</Col>
                    <Col md={4}>
                        <InputGroup>
                            <FormControl
                                placeholder="Search by company name"
                                aria-label="Search by company name"
                                onChange={this.setCompanyNameFilterValue}
                            />
                            <Button variant="outline-secondary" onClick={() => { this.filterByCompanyName() }}>Search</Button>
                        </InputGroup>
                    </Col>
                    <Col md={2}>
                        <Button variant="outline-secondary" onClick={() => { this.filterLastSevenDaysJob() }}>Last 7 Day's Job</Button>
                    </Col>
                </Row>

                <Row xs={1} md={4} className="g-4">
                    {
                        this.state.filterdRecords.map(record => {
                            return <JobCard job={record}></JobCard>;
                        })
                    }
                </Row>
            </Container >
        );
    }
}

export default Jobs;