import PropType from 'prop-types';

const Stars = ({ votesAvg, handleAddVote }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const starPath = i <= votesAvg ? '/star-fill.svg' : '/star-empty.svg';

        stars.push(
            <img src={starPath} key={i} onClick={() => handleAddVote(i)} />
        );
    }
    return (<div>
        <div className="flex h-5 w-5">{stars}</div>
        <span>{votesAvg} estrellas</span>
        </div>)
};

Stars.propTypes = {
    votesAvg: PropType.number.isRequired,
    handleAddVote: PropType.func.isRequired,
};

export default Stars;
