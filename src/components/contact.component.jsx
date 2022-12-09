import React from 'react';
import { useHubspotForm } from  '@aaronhayes/react-use-hubspot-form';


const Contact = () => {
     useHubspotForm({
        region: "eu1",
        portalId: '26695241',
        formId: '249a186d-6341-41c5-b067-f5597db52517',
        target: '#my-hubspot-form'
    });
    return (
            <div >
            <div className='testHubspot'>
                <h1>Contactez-nous!</h1>
                <div id="my-hubspot-form"/>
            </div>
            </div>
    )
}

export default Contact


