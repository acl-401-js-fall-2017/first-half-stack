module.exports = (file, shortMessage, data) => {

    const spaceCount = 60 - file.length;
    console.log(`LOG: ${file}${new Array(spaceCount).join('.')}${shortMessage}`);
    if(data) {
        console.log(data);
    }            
    console.log(`''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''`);
};