import './Premium.css';
import React from 'react';

function Premium() {
    return (
        <div className="premium-container">
            <h1 className="premium-heading">Upgrade to Premium</h1>
            <p className="premium-subheading">Enjoy an enhanced experience, exclusive creator tools, top-tier verification, and security.</p>
            
            <div className="premium-plan">
                <div className="premium-plan-title">
                    <span>Annual</span>
                    <span className="premium-plan-best-value">Best Value</span>
                </div>
                <div className="premium-plan-details">
                    <h3>Basic</h3>
                    <div className="premium-plan-price">
                        <h1>₹215.87</h1>
                        <h4>/month</h4>
                    </div>
                    <h4 className="billed-annually">₹2590.48 billed annually</h4>
                    <h5 className="savings">Save 11%</h5>
                    <ul>
                        <li>Small reply boost</li>
                        <li>Encrypted direct messages</li>
                        <li>Bookmark folders</li>
                        <li>Highlights tab</li>
                        <li>Edit post</li>
                        <li>Post longer videos</li>
                        <li>Longer post</li>
                    </ul>
                </div>
            </div>

            <div className="premium-plan">
                <div className="premium-plan-title">Monthly</div>
                <div className="premium-plan-details">
                    <h3>Premium</h3>
                    <div className="premium-plan-price">
                        <h1>₹566.67</h1>
                        <h4>/month</h4>
                    </div>
                    <h4 className="billed-annually">₹6,800 billed annually</h4>
                    <h5 className="savings">Save 12%</h5>
                    <h4>Everything in Basic, and</h4>
                    <ul>
                        <li>Half Ads in For You and Following</li>
                        <li>Larger reply boost</li>
                        <li>Get paid to post</li>
                        <li>Checkmark</li>
                        <li>Grok Early Access</li>
                        <li>X Pro, Analytics, Media Studio</li>
                        <li>Creator Subscriptions</li>
                    </ul>
                </div>
            </div>

            <div className="premium-plan">
                <div className="premium-plan-details">
                    <h3>Premium+</h3>
                    <div className="premium-plan-price">
                        <h1>₹1,133.33</h1>
                        <h4>/month</h4>
                    </div>
                    <h4 className="billed-annually">₹13,600 billed annually</h4>
                    <h5 className="savings">Save 12%</h5>
                    <h4>Everything in Premium, and</h4>
                    <ul>
                        <li>No ads in For You and Following</li>
                        <li>Largest reply boost</li>
                        <li>Write Articles</li>
                    </ul>
                </div>
            </div>

            <div className="premium-footer">
                <button className="premium-subscribe-button">Subscribe and Pay</button>
                <p className="premium-terms">
                    By subscribing, you agree to our <a href="https://legal.x.com/en/purchaser-terms.html">Purchaser Terms of Service</a>. Subscriptions auto-renew until canceled, as described in the Terms. <a href="https://legal.x.com/en/purchaser-terms.html#cancelpremium">Cancel anytime</a>. Cancel at least 24 hours prior to renewal to avoid additional charges. A verified phone number is required to subscribe. If you've subscribed on another platform, manage your subscription through that platform.
                </p>
            </div>
        </div>
    );
}

export default Premium;
