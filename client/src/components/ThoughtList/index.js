import React from 'react';

const ThoughtList = ({ thoughts, title }) => {
    if(!thoughts.length) {
        return <h3>No thoughts here</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {thoughts && 
            thoughts.map(thought => (
                <div key={thought._id} className="card mb-3">
                    <p className="card-header">
                        {thoughts.username}
                        thought on {thought.createdAt}
                    </p>
                    <div className="card-body">
                        <p>{thought.thoughtText}</p>
                        <p className="mb-0">
                            Reactions: {thought.reactionCount} || Click to{ ' ' }
                            {thought.reactionCOunt ? 'see' : 'start'} the discussion!
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ThoughtList;