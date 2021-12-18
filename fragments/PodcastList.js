import PodcastItem from "../widgets/PodcastItem";

const PodcastList = props => {
    const pods = props.podcasts
    const podsList = pods.map(el=>{   
        <PodcastItem title={el.title.rendered} />
    })
    return podsList
}

export default PodcastList;