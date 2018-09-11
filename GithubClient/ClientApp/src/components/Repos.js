import React, { Component } from 'react';
import RepoItem from './RepoItem';
export class Repos extends Component {
    displayName = Repos.name
    constructor(props) {
        super(props);
        this.state = { repos: null };
    }
    //Search function 
    onSearch = (e) => {
        e.preventDefault();

        const { value } = this.input;

        if (value === '') {
            return;
        }

        fetch('https://api.github.com/search/repositories?q=' + value)
            .then(response => response.json())
            .then(result => this.onSetResult(result));
    }

    //Set state function
    onSetResult = (result) => {
        console.log(result)
        let chunkedArrayOfRepos = this.chunkArrayInGroups(result.items)
        this.setState({ repos: chunkedArrayOfRepos });
    }

    //Add bookmark to .NET Session state
    onAddToBookmark = (item) => {
        console.log('Test')
        fetch('/Repos/AddRepo', {
            method: 'POST', body: JSON.stringify(item), headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(json => console.log(json)).catch(err => console.error({ err }));

    }
    
    chunkArrayInGroups = (arr) => {
        // Break it up.
        var arr2 = [];
        for (var i = 0; i < arr.length; i+=4) {
          arr2.push(arr.slice(i , i+4));
        }
        return arr2;
      }
    
    render() {
        return (
            <div>
                <h1>Search GitHub repositories</h1>

                <form onSubmit={this.onSearch}>
                    <div className="input-group col-md-4">
                        <input type="text" className="form-control input-lg" ref={node => this.input = node} />
                        <span className="input-group-btn">
                        <button className="btn btn-primary btn-lg" type="submit">Search</button>
                        </span>
                    </div>
                    
                </form>
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
