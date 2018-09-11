import React, { Component } from 'react';
import RepoItem from './RepoItem';

export class Bookmarks extends Component {
    displayName = Bookmarks.name
    constructor(props) {
        super(props);
        this.state = { repos: null }
    }

    // For now use it like this but next time make this function importable 
    chunkArrayInGroups = (arr) => {
        // Break it up.
        var arr2 = [];
        for (var i = 0; i < arr.length; i += 4) {
            arr2.push(arr.slice(i, i + 4));
        }
        return arr2;
    }

    onSetResult = (result) => {
        console.log(result)
        let chunkArray = this.chunkArrayInGroups(result);
        this.setState({repos : chunkArray});
    }
    componentWillMount = () => {
      fetch('/Repos').then(res => res.json()).then(json => this.onSetResult(json))
    }
    
    render() {
        return (
            <div>
                <h1>Bookmarks</h1>
                {
                    this.state.repos &&
                    this.state.repos.map((row , key) =>(
                        <div className="row" key={key}>
                            {row.map((item) => (
                                <RepoItem key={item.id} repo={item} onAddToBookmark={() => this.onAddToBookmark(item)} />
                         ))}
                        </div>
                    ))
                }
            </div>
         );
    }
}