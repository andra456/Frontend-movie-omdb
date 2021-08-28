import React from "react";
import './_index.scss'
type Props = {
    bg : string,
    className : string
}

export const Card : React.FC<Props> = ({ bg, className })=> {
    return (
        <div className={`photo-card`} >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="image-mask">
          
                <path d="
                M 0, 100
                C 0, 0 0, 0 100, 0
                S 200, 0 200, 100
                    200, 200 100, 200
                    0, 200 0, 100
                " fill="#FADB5F" transform="rotate(
                    0,
                    100,
                    100
                ) translate(
                    0
                    0
                )"></path>
                </clipPath>
                </defs>
                <image width="100%" height="100%" preserveAspectRatio="xMidYMid slice" 
                xlinkHref={bg} clip-path="url(#image-mask)"></image>

            </svg>
        </div>
    )
}

