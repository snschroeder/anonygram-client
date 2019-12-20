import React from "react";
import './NavBar.css'

export default function NavBar(props) {
    const { setSort } = props;
    
    return (
    <div className="toggle toggle-green">
        <input type="radio" className="toggle-input" name="view" value="popular" id="popular"  onClick={() => setSort()} />
        <label htmlFor="popular" className="toggle-label toggle-label-off">POPULAR</label>
        <input type="radio" className="toggle-input" name="view" value="newest" id="newest" onClick={() => setSort()} />
        <label htmlFor="newest" className="toggle-label toggle-label-on">NEWEST</label>
        <span className="toggle-selection"></span>
    </div>

    );
}