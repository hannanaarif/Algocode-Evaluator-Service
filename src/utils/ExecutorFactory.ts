import cppExecuter from '../containers/cppExecuter';
import javaExecuter from '../containers/javaExecuter';
import pythonExceuter from '../containers/pythonExecuter';
import CodeExecuterStrategy from '../types/CodeExecutorStrategy';


export default function createExecutor(codeLanguage:string):CodeExecuterStrategy|null{
     console.log('code executer');
     console.log('code language',codeLanguage);
    if(codeLanguage==='PYTHON'){
        return new pythonExceuter();
    }
    else if(codeLanguage.toLowerCase()==='java'){
        console.log('code executer java');
        return new javaExecuter();
    }
    else{
        return new cppExecuter();
    }

}