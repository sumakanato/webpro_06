"use strict";

document.querySelector('#get1').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState( null, '', '/bbs/get/' );
    const url = "/BBS";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
    });
});

document.querySelector('#post2').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  'name=John&message=Hello',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState( null, '', '/bbs/post/' );
    const url = "/BBS";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
    });
});

document.querySelector('#get2').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState( null, '', '/bbs/get/1' );
    const url = "/BBS/1";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
    });
});

document.querySelector('#put').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "PUT",
        body:  'id=1&name=John&message=Updated+Message',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState( null, '', '/bbs/put/1' );
    const url = "/BBS/1";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
    });
});

document.querySelector('#delete').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "DELETE",
        body:  'id=1',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState( null, '', '/bbs/delete/1' );
    const url = "/BBS/1";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
    });
});