import React, { useState, useEffect, useRef } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import SubmissionForm from '../SubmissionForm/SubmissionForm';
import { useImageContext } from '../../contexts/ImageContext';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
    const [pageOffset, setPageOffset] = useState(1000);
    const [bottom, setBottom] = useState(2000);

    const context = useImageContext();
    const dpFeedRef = useRef(null);

    const { images, page, setPage, morePagesAvail, debounce, handleDelete, incrementUpvotes } = context;

    const { userLocation, newContentLoaded, updateNewContent, ...rest } = props

    useEffect(() => {
        props.setView('feed');
        setPageOffset(window.pageYOffset);
        setBottom(dpFeedRef.current.getBoundingClientRect().bottom);
        const handleScroll = () => {
            setPageOffset(window.pageYOffset);
        }
        window.addEventListener('scroll', handleScroll);
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    useEffect(() => {
        if (dpFeedRef.current) {
            setBottom(dpFeedRef.current.getBoundingClientRect().bottom);
        }

        if (pageOffset >= bottom && morePagesAvail && !debounce) {
            let pageClone = page + 1;
            setPage(pageClone);
            setPageOffset(window.pageYOffset);
        };

    }, [bottom, pageOffset, morePagesAvail, page, setPage, debounce]);

    const generateJSX = () => {

        if (!images) {
            return null;
        }
        return (
            <>
                <ul className="img-container" ref={dpFeedRef}>
                    {images.map(imgObj => (
                        <DisplayItem
                            imgAddress={imgObj.image_url}
                            imgCaption={imgObj.image_text}
                            upvotes={imgObj.karma_total}
                            id={imgObj.id}
                            userId={imgObj.user_id}
                            incrementUpvotes={incrementUpvotes}
                            handleDelete={handleDelete}
                            key={imgObj.id}
                        />
                    ))}
                </ul>
                <SubmissionForm
                  routeProps={rest}
                  userLocation={userLocation}
                  newContentLoaded={newContentLoaded}
                  updateNewContent={updateNewContent}
                  parent='DisplayFeed'
                />
            </>
        )
    }

    return (
        <section className="display-feed">
            {generateJSX()}
        </section>
    )
}

DisplayFeed.defaultProps = {
    setView: () => {}
}