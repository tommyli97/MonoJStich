import React from 'react';
import { initializeApp } from 'firebase/app';
import {
	getFirestore, collection, getDocs, onSnapshot,
	addDoc, deleteDoc, doc,
	query, where,
	orderBy, serverTimestamp,
	getDoc, updateDoc
} from 'firebase/firestore';

const Addline = (props) => {
	// this function returns true if the code is value
    // otherwise it returns false
    const checkCodeValidity = (str) => {
        // if (!new Function(eval(str))) {
        //     return false;
        // }
		try {
			!new Function(eval(str))
			return true;		
		}
		catch {
			return false;
		}
    };

	// init firebase app
	initializeApp(props.config);

	// init services
	const db = getFirestore();

	// collection ref
	const colRef = collection(db, 'oneliners');

	// add line
	// const addLine = document.getElementById('addLine');
	const addLine = () => {
		const title = document.getElementById('name');
		const code = document.getElementById('code');
		const author = document.getElementById('author');

		if (!checkCodeValidity(code.value)) {
			window.alert('Invalid code!')
			return;
		}

		addDoc(colRef, {
			title: title.value,
			code : code.value,
			author: author.value ? author.value : 'Unknown',
			createdAt: serverTimestamp()
		})
			.then(() => {
				// reset form after submit
				title.value = '';
				code.value = '';
				author.value = '';
			})
	};


    return (
        <div className='mt-5'>
            <form id='addLine' onSubmit={(e) => {e.preventDefault(); addLine()}}>
                <label htmlFor="title">Title:</label>
                <input type="text" name='title' id='name' required/>
                <label htmlFor="code">Code:</label>
                <input type="text" name='code' id='code' required/>
                <label htmlFor="author">Author:</label>
                <input type="text" name='author' id='author'/>

				<button>Submit</button>
            </form>
        </div>
    );
};

export default Addline;