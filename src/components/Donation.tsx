import React, {useEffect} from "react";
import "./Donation.scss";
import WhyDonate from "./WhyDonateEmbed";
import {Button, Col, Row} from "react-bootstrap";

const Donation = () => {


    const whyDontate = true;
    return whyDontate ?
                (<>
                   
                <Row>
                    <Col></Col>
                    <Col>
                        <br/>
                    <Button onClick={ () => 
                    {
                        const width = window.innerWidth * 0.9; 
                        const height = window.innerHeight * 0.9;

                        // Calculate the left position
                        const left = window.innerWidth * 0.05;//"100px"//(screen.width / 2) - (width / 2);
                        // Calculate the top position
                        const top =  window.innerHeight * 0.05;//"100px"//(screen.height / 2) - (height / 2);

                        window.open("https://whydonate.com/en/donate/save-our-planet", "newWindow", `width=${width}, height=${height}, left=${left}, top=${top}`);
          
                    }}>Donate</Button>
                    </Col>
                    <Col></Col>
                </Row>
                </>)
        :
        (<>

        <iframe className="gfm-embed-iframe gofundme"
                            src="https://www.gofundme.com/f/nrtaab-we-need-to-know/widget/medium/#:~:tcm-regime=GDPR&tcm-prompt=Hidden"
                            title="W3Schools Free Online Web Tutorials"></iframe>

                </>)
        
};


export default Donation