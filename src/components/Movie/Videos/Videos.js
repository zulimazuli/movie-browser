import React from 'react';
import styles from './Videos.module.css';


const Videos = (props) => {

    const iframeStyling = '*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 10px black}span:hover{color:#f08000}';

    const videos = props.videos.map(video => {

        if(video.site !== 'YouTube') {
            return null;
        }

        const videoUrl = 'https://www.youtube.com/embed/' + video.key;
        return (
            <div key={video.id} className={styles.Video}>
                <div className={styles.Name} title={video.name}>{video.name}</div>
                <iframe
                src={videoUrl}
                srcDoc={"<style>" + iframeStyling + "</style><a href=" + videoUrl + "?autoplay=1><img src=https://img.youtube.com/vi/" + video.key + "/hqdefault.jpg alt='" + video.name + "'><span>&#x25BA;</span></a>"}
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.name}
                alt={video.name}
                ></iframe>
            </div>
        );
    })
    
    return videos;
}

export default Videos;

// 0:
// id: "5d221db394d8a87d3441b212"
// iso_639_1: "en"
// iso_3166_1: "US"
// key: "01ON04GCwKs"
// name: "Disney's Mulan - Official Teaser"
// site: "YouTube"
// size: 1080
// type: "Teaser"
// __proto__: Object