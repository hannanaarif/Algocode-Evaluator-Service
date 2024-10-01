import Docker from 'dockerode';

async function createContainer(imageName:string,cmdExecutible:string[]){
    const docker = new Docker();

    const container=await docker.createContainer({
        Image:imageName,
        Cmd:cmdExecutible,
        Tty:false,
        AttachStdin:true,
        AttachStdout:true,
        AttachStderr:true,
        OpenStdin:true
    });
    return container;
};

export default createContainer;