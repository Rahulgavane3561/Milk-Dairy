import "./Footer.css"

import React from 'react'

function Footer() {
  return (
    <footer>
        <div className="footer-col">
            <h4>products</h4>
            <ul>
                <li><a href="#">Raw milk</a></li>
                <li><a href="#">Cattle feed</a></li>
                <li><a href="#">Medicine</a></li>
                <li><a href="/milkcollection/signin">collect</a></li>
                <li><a href="/admindashboard/">admin page</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>network</h4>
            <ul>
                <li><a href="#">technology</a></li>
                <li><a href="#">science</a></li>
                <li><a href="#">business</a></li>
                <li><a href="#">professional</a></li>
                <li><a href="#">API</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>Branches</h4>
            <ul>
                <li><a href="#">Athani</a></li>
                <li><a href="#">Belagavi</a></li>
                <li><a href="#">Savalagi</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>follow us</h4>
            <div className="links">
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer