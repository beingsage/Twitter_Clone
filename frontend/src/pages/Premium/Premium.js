// import './Premium.css';
// import React,{useState} from 'react';

// const annual= ()=>(
//     const [state, 1] = useState();
// )

// function Premium() {
//     return (
//         <div className="premium-container">
//             <h1 className="premium-heading">Upgrade to Premium</h1>
//             <p className="premium-subheading">Enjoy an enhanced experience, exclusive creator tools, top-tier verification, and security.</p>
            
//             <div className="premium-plan">
//                 <div className="premium-plan-title">
//                     <button onClick={annual} className="a"> 
//                     <span className="premium-plan-annual">Annual</span>
//                     <div className="d">
//                     <span className="premium-plan-best-value">Best Value</span>
//                     </div>
//                     </button>
//                     <button  className="c">Monthly</button>
//                     </div>
//                 <div className="plans">
//                 <div className="premium-plans">
//                     <h3>Basic</h3>
//                     <div className="premium-plan-price">
//                         <h1>₹215.87</h1>
//                         <h4>/month</h4>
//                     </div>
//                     <h4 className="billed-annually">₹2590.48 billed annually</h4>
//                     <h5 className="savings">Save 11%</h5>
//                     <ul>
//                         <li>Small reply boost</li>
//                         <li>Encrypted direct messages</li>
//                         <li>Bookmark folders</li>
//                         <li>Highlights tab</li>
//                         <li>Edit post</li>
//                         <li>Post longer videos</li>
//                         <li>Longer post</li>
//                     </ul>
//                 </div>
            

//             <div className="premium-plans">
//                 <div className="premium-plan-details">
//                     <h3>Premium</h3>
//                     <div className="premium-plan-price">
//                         <h1>₹566.67</h1>
//                         <h4>/month</h4>
//                     </div>
//                     <h4 className="billed-annually">₹6,800 billed annually</h4>
//                     <h5 className="savings">Save 12%</h5>
//                     <h4>Everything in Basic, and</h4>
//                     <ul>
//                         <li>Half Ads in For You and Following</li>
//                         <li>Larger reply boost</li>
//                         <li>Get paid to post</li>
//                         <li>Checkmark</li>
//                         <li>Grok Early Access</li>
//                         <li>X Pro, Analytics, Media Studio</li>
//                         <li>Creator Subscriptions</li>
//                     </ul>
//                 </div>
//             </div>

//             <div className="premium-plans">
//                 <div className="premium-plan-details">
//                     <h3>Premium+</h3>
//                     <div className="premium-plan-price">
//                         <h1>₹1,133.33</h1>
//                         <h4>/month</h4>
//                     </div>
//                     <h4 className="billed-annually">₹13,600 billed annually</h4>
//                     <h5 className="savings">Save 12%</h5>
//                     <h4>Everything in Premium, and</h4>
//                     <ul>
//                         <li>No ads in For You and Following</li>
//                         <li>Largest reply boost</li>
//                         <li>Write Articles</li>
//                     </ul>
//                 </div>
//             </div>
//             </div>
//             </div>

//             <div className="premium-footer">
//                 <button className="premium-subscribe-button">Subscribe and Pay</button>
//                 <p className="premium-terms">
//                     By subscribing, you agree to our <a href="https://legal.x.com/en/purchaser-terms.html">Purchaser Terms of Service</a>. Subscriptions auto-renew until canceled, as described in the Terms. <a href="https://legal.x.com/en/purchaser-terms.html#cancelpremium">Cancel anytime</a>. Cancel at least 24 hours prior to renewal to avoid additional charges. A verified phone number is required to subscribe. If you've subscribed on another platform, manage your subscription through that platform.
//                 </p>
//             </div>
//         </div>
        
//     );
// }

// export default Premium;


import './Premium.css';
import React, { useState } from 'react';

const Premium = () => {
    const [billingCycle, setBillingCycle] = useState('annual');
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleBillingCycleChange = (cycle) => {
        setBillingCycle(cycle);
        setSelectedPlan(null); // Reset the selected plan when the billing cycle changes
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleSubscribe = () => {
        const plans = {
            annual: {
                basic: 2590.48,
                premium: 6800,
                premiumPlus: 13600,
            },
            monthly: {
                basic: 243,
                premium: 650,
                premiumPlus: 1300,
            },
        };
        const selectedPrice = plans[billingCycle][selectedPlan];
        console.log(`Selected Plan: ${selectedPlan}, Price: ${selectedPrice}`);
        // Here, you would update the backend with the selected plan and price
    };

    const planDetails = {
        annual: {
            basic: { price: 215.87, billed: 2590.48, savings: 'Save 11%' },
            premium: { price: 566.67, billed: 6800, savings: 'Save 12%' },
            premiumPlus: { price: 1133.33, billed: 13600, savings: 'Save 12%' },
        },
        monthly: {
            basic: { price: 243, billed: 243, savings: '' },
            premium: { price: 650, billed: 650, savings: '' },
            premiumPlus: { price: 1300, billed: 1300, savings: '' },
        },
    };

    const renderPlan = (planKey, planName) => {
        const plan = planDetails[billingCycle][planKey];
        return (
            <div
                className={`premium-plans ${selectedPlan === planKey ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(planKey)}
            >
                <h3>{planName}</h3>
                <div className="premium-plan-price">
                    <h1>₹{plan.price}</h1>
                    <h4>/month</h4>
                </div>
                <h4 className="billed-annually">₹{plan.billed} billed {billingCycle === 'annual' ? 'annually' : 'monthly'}</h4>
                {plan.savings && <h5 className="savings">{plan.savings}</h5>}
                <ul>
                    <li>Small reply boost</li>
                    <li>Encrypted direct messages</li>
                    <li>Bookmark folders</li>
                    <li>Highlights tab</li>
                    <li>Edit post</li>
                    <li>Post longer videos</li>
                    <li>Longer post</li>
                    {planKey !== 'basic' && (
                        <>
                            <h4>Everything in Basic, and</h4>
                            <li>Half Ads in For You and Following</li>
                            <li>Larger reply boost</li>
                            <li>Get paid to post</li>
                            <li>Checkmark</li>
                            <li>Grok Early Access</li>
                            <li>X Pro, Analytics, Media Studio</li>
                            <li>Creator Subscriptions</li>
                        </>
                    )}
                    {planKey === 'premiumPlus' && (
                        <>
                            <h4>Everything in Premium, and</h4>
                            <li>No ads in For You and Following</li>
                            <li>Largest reply boost</li>
                            <li>Write Articles</li>
                        </>
                    )}
                </ul>
            </div>
        );
    };

    return (
        <div className="premium-container">
            <h1 className="premium-heading">Upgrade to Premium</h1>
            <p className="premium-subheading">Enjoy an enhanced experience, exclusive creator tools, top-tier verification, and security.</p>
            
            <div className="premium-plan">
                <div className="premium-plan-title">
                    <button onClick={() => handleBillingCycleChange('annual')} className={`a ${billingCycle === 'annual' ? 'active' : ''}`}> 
                        <span className="premium-plan-annual">Annual</span>
                        <div className="d">
                            <span className="premium-plan-best-value">Best Value</span>
                        </div>
                    </button>
                    <button onClick={() => handleBillingCycleChange('monthly')} className={`c ${billingCycle === 'monthly' ? 'active' : ''}`}>Monthly</button>
                </div>
                <div className="plans">
                    {renderPlan('basic', 'Basic')}
                    {renderPlan('premium', 'Premium')}
                    {renderPlan('premiumPlus', 'Premium+')}
                </div>
            </div>

            <div className="premium-footer">
                <button className="premium-subscribe-button" onClick={handleSubscribe}>Subscribe and Pay</button>
                <p className="premium-terms">
                    By subscribing, you agree to our <a href="https://legal.x.com/en/purchaser-terms.html">Purchaser Terms of Service</a>. Subscriptions auto-renew until canceled, as described in the Terms. <a href="https://legal.x.com/en/purchaser-terms.html#cancelpremium">Cancel anytime</a>. Cancel at least 24 hours prior to renewal to avoid additional charges. A verified phone number is required to subscribe. If you've subscribed on another platform, manage your subscription through that platform.
                </p>
            </div>
        </div>
    );
};

export default Premium;
