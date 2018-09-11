import React from 'react'

const RepoItem = (props) => {
  const { repo, onAddToBookmark} = props;
  return (
    <div key={repo.id}>
     <div>
        <div className="col-md-3">
            <div className="thumbnail">
                <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                <div className="caption">
                    <h3>{repo.full_name}</h3>
                    <p>
                        <a target="_blank" href={repo.html_url} className="btn btn-primary" role="button">Link to repository </a>
                        <a className="btn btn-default" role="button" onClick={onAddToBookmark}>Add to bookmarks</a>
                    </p>
                </div>
            </div>
        </div>
     </div>
  </div>
  )
}

export default RepoItem
