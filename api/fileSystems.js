import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

export const saveFileMp3 = async (mp3Data) => {
    console.log("File System: Save File MP3:", mp3Data)
    const dirs = RNFetchBlob.fs.dirs
    const newFilePath = dirs.DocumentDir + '/mp3/' + mp3Data.slug + '.mp3'
    console.log("Saving Element:", mp3Data, newFilePath)
    const updateData = await RNFetchBlob
    .config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache : true,
        path: newFilePath
    })
    .fetch('GET', mp3Data.mp3, {
        //some headers ..
    })
    .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
        const newIndex = updateIndex({
            id: mp3Data.id,
            title: mp3Data.title.rendered,
            artwork: mp3Data.featured_image_urls.medium,
            mp3: res.path()
        })

        return newIndex
        
    }).then((itm)=>{
        return itm
    }).catch((err)=>{
        console.log("ERROR!!!:", err.message, err.code)
    })
    return updateData
}

export const resetIndex = () => {
    // Create JSON index file
    const path = RNFS.DocumentDirectoryPath + '/mp3/';
    const posListPath =  RNFS.DocumentDirectoryPath + '/listened/';
    const index = []
    const indexAm = RNFS.mkdir(path).then(res => {
        RNFS.writeFile(path + 'index.am', JSON.stringify(index), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
    }).catch((err)=>{
        console.log(err.message, err.code);
    })

    const posDir = RNFS.mkdir(posListPath).then((res)=>console.log('Position list created',res))

}

export const deleteIndex = () => {
    const path = RNFS.DocumentDirectoryPath + '/mp3/index.am'
    RNFS.readDir( RNFS.DocumentDirectoryPath + '/mp3/' ).then( (el) => {
        el.map( item => {
            RNFS.unlink( item.path ).then( () => {
                console.log('FILE DELETED', item.path)
            }).catch( (err) => {
                console.log('ERROR:', err.message) 
            })
            // 
        })
    }).then( () => {
        RNFS.unlink(path).then(() => {
            console.log('FILE DELETED', path)
        }).catch((err) => {
            console.log(err.message)
            resetIndex()
        })
    })
}

export const loadMp3Index = () => {
    const dirPath = RNFS.DocumentDirectoryPath + '/mp3/'
    const mp3Index = RNFS.readDir(dirPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
         console.log('FS: Files Found:', result);
        // stat the first file
        return Promise.all([RNFS.stat(dirPath + "index.am"), dirPath + "index.am"]);
    })
    .then((statResult) => {
        if (statResult[0].isFile()) {
            // if we have a file, read it
            console.log("FS:LOADMP3INDEX: Index Found... Loading...")
            return RNFS.readFile(statResult[1], 'utf8');
        }
        return false;
    }).catch((err) => {
        resetIndex()
        console.log("LOADMP3INDEX: Index Load:", err.message, err.code);
    });
    return mp3Index
}

export const updateIndex = (newItem) => {
    
    console.log("FS:UPDATE INDEX: Updating Index File")
    const indexPath = RNFS.DocumentDirectoryPath + '/mp3/index.am'
    console.log("FS:UPDATE INDEX: Index Path", indexPath)

    const readFile = RNFS.readFile(indexPath)
        .then(res=>{
            console.log("FS:UPDATE INDEX: Index.am Result",res)
            return JSON.parse(res)})
        .then( itm => {
            console.log("FS:UPDATE INDEX: Parsed Index.am", itm)
            itm.push(newItem)
            console.log("FS:UPDATE INDEX: Updated Index.am:", itm)
            writeIndexAm(itm)
            return itm
        })
        .catch((err) => {
            console.log(err.message, err.code);
        })
    console.log('FS:FILE RETURNED', readFile)
        return readFile

}

export const deleteFile = async (file) => {
    const dirPath = RNFS.DocumentDirectoryPath + '/mp3/'
    const indexAm = dirPath + 'index.am'
    const mp3Index = await getMp3Index().then((data)=>{
            console.log("FS:DELETEFILE: Parsing JSON Index.am", data)
            return JSON.parse(data)
        }).then((mp3Obj)=>{
            console.log("FS:DELETEFILE: Filter out deleted object", mp3Obj)
           return mp3Obj.filter((el)=> el.mp3 !== file)
        }).then(finalObj=>{
            console.log("FS:DELETEFILE: Returning Final Object", finalObj)
            return finalObj
        }).catch(err=> {
            console.log('FS:DELETEFILE:INDEXING ERROR:', err.message, err.code)
            })
        
    //const newIndex = mp3Index.filter((el)=> el.mp3 !== file)
    console.log("FS:DELETEFILE: MP3 Index Loaded",mp3Index)
    if (mp3Index) {
        console.log("FS:DELETEFILE - New Index:", mp3Index)
        RNFS.unlink(indexAm).then((res)=>{
            console.log("FS:DELETEFILE - File Deleted:", res)
            RNFS.writeFile(indexAm, JSON.stringify(mp3Index), 'utf8').then((success) => {
                console.log('FS:DELETEFILE: Index Updated!');
            }).catch(err=>console.log('FS:DELETEFILE:WRITE INDEX ERROR:', err.message, err.code))
        }).catch(err=>console.log('FS:DELETEFILE:DELETE INDEX ERROR:', err.message, err.code))
        
    }

    const unlinkFile = await RNFS.unlink(file)
    .then(() => {
        console.log('FS:DELETEFILE:', file);
        return mp3Index;
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
        console.log('FS:DELETEFILE:ERROR:DELETING',err.message, err.code);
        //resetIndex();
    });

    return unlinkFile
}

export const getMp3Index = async () =>{ 
    const dirPath = RNFS.DocumentDirectoryPath + '/mp3/'
    const mp3Index = RNFS.readDir(dirPath)
    .then((result) => {
        console.log('FS:GETMP3INDEX:', result);
        // stat the first file
        return Promise.all([RNFS.stat(dirPath + "index.am"), dirPath + "index.am"]);
    })
    .then((statResult) => {
        console.log("FS:GETMP3INDEX: Stat Results", statResult)
        if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
        }
        return false;
    })
    .catch((err)=>{
        console.log('FS:GETMP3INDEX: ERROR - ', err.message);
        resetIndex().then(()=>getMp3Index())
    })

    return mp3Index
}

// Write the Index AM File.   "contents" is array
export const writeIndexAm = (contents) => {
    const indexPath = RNFS.DocumentDirectoryPath + '/mp3/index.am'
    RNFS.writeFile(indexPath, JSON.stringify(contents), 'utf8')
            .then((success) => {
                console.log('FS:WRITEINDEXAM: Index.am Updated!');
            })
}

// Write the Index AM File.   "contents" is array
export const writePositionMp3 = (key, position) => {
    const indexPath = RNFS.DocumentDirectoryPath + '/listened/'+ key.toString() +'.am'
    const posString = position.toString()
    console.log("WRITING POSITION", indexPath, posString)
    RNFS.writeFile(indexPath, posString, 'utf8')
            .then((res) => {
                console.log(`FS:WRITEPOSITION: ${key.toString()}.am Updated!`, res);
            }).catch((err)=>{
                console.log('FS:WRITEPOSITION: ERROR - ', err.message);
            })
}

export const getPostionMp3 = (key) =>{ 
    const dirPath = RNFS.DocumentDirectoryPath + '/listened/'+ key.toString() +'.am'
    const mp3pos = RNFS.readFile(dirPath, 'utf8')
        .then(res=>{
            console.log("FS:GETPOSITION:RAW:",res)
            return true
        })
        
        .catch((err) => {
            console.log("FS:GETPOSITION:ERROR: !!!!", err.message, err.code);
            return false
        })

    return mp3pos
}

export const getPosList = async (key) =>{ 
    const dirPath = RNFS.DocumentDirectoryPath + '/mp3/index.am' //+ key.toString() +'.am'
    RNFS.readFile(dirPath, 'utf8')
        .then(res=>{
            console.log("FS:GETPOSITION:RAW:",res)
        })
        
        .catch((err) => {
            console.log("FS:GETPOSITION:ERROR: !!!!", err.message, err.code);
            resetIndex()
        })
}