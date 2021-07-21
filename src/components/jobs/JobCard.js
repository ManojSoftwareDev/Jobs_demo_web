import React from 'react';
import { Card, Col } from "react-bootstrap";

export const JobCard = (job) => {

    return (
        <Col>
            <Card className="text-start">
                <Card.Header as="h5" style={{ backgroundColor: '#0DCAB8' }}>{job.job.jobTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p><cite>{job.job.companyName}</cite></p>
                        <hr />
                        <p>{job.job.shortDesc}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}