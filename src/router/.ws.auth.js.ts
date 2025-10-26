
/**
 * GENERATED FILE FROM THE TYPESCRIPT-WORKSHEET EXTENSION
*/

import * as __fs from 'node:fs';
import os from 'node:os';
const dataFile: any[] = [];

async function __tsrun() {
try {

const express =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'express',  called: () => (require("express")), line: 2});
const route =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'route',  called: () => (express.Router()), line: 3});
const User =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'User',  called: () => (require("../configs/databaseSchema")), line: 4});
const { signupValidator } =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: '{ signupValidator }',  called: () => (require("../middlewares/validator")), line: 5});
await tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: async () => (route.get("/login", async (req, res) => {
  try {
    const { email, password } =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: '{ email, password }',  called: () => (req.body), line: 8});
    const userData = await tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'userData',  called: async () => (await tsWorksheetWatch({stringed: 'empty', type: 'expression', hide: true,  called: async () => (await User.findOne({ email: email })), line: 9})), line: 9});

    if ( tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (!userData), line: 11})) {
      tsWorksheetWatch({type: 'throw', stringed: 'empty', variable: undefined, called: () => (new Error("Wrong User Credentials")), line: 12});
    } else {
      if ( tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (userData.verifyPassword(password)), line: 14})) {
        const token =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'token',  called: () => (userData.generateToken()), line: 15});
         tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.cookie("token", token, {
                    expires: new Date(Date.now() + 168 * 3600000),
                  })), line: 16});
         tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.status(200).send("Login Successfull!")), line: 19});
      } else {
         tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.status(400).send("Wrong User Credentials")), line: 21});
      }
    }
  } catch (error) {
     tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.status(400).send(error.message)), line: 25});
  }
})), line: 6});

await tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: async () => (route.post("/signup", async (req, res) => {
  try {
    const userCredentials =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'userCredentials',  called: () => (signupValidator(req.body)), line: 31});
    const user =  tsWorksheetWatch({stringed: 'empty', type: 'variable', variable: 'user',  called: () => (new User(userCredentials)), line: 32});
    await tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: async () => (await tsWorksheetWatch({stringed: 'empty', type: 'expression', hide: true,  called: async () => (await user.save()), line: 33})), line: 33});
     tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.status(201).send("Data Saved Successfully")), line: 34});
  } catch (error) {
     tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.status(403).send(error.message)), line: 36});
  }
})), line: 29});

 tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (route.get("/logout", async (req, res) => {
   tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (res.clearCookie().send()), line: 41});
})), line: 40});

 tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (route.stack), line: 44});
 tsWorksheetWatch({stringed: 'empty', type: 'expression', variable: undefined,  called: () => (module.exports = route), line: 45});


} catch(error) {

  
}
}

__tsrun().then()

let ___done_ts_worksheet = "";
___done_ts_worksheet = "asdf";


function stringify(obj: any) {
  let cache: any = [];
  let str = JSON.stringify(obj, function(key, value) {
    if(typeof value === 'function') {
      const fn = __tsGetFn(value.toString()) ?? __tsGetArrowFn(value.toString());
      return fn;
    }
    if(value === undefined) {
      return '__TS_WORKSHEET_UNDEFINED__'
    }
    if (typeof value === "object" && value !== null) {
      if(value?.then) {
        return 'Promise';
      }
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
      return value === undefined ? '__TS_WORKSHEET_UNDEFINED__' : value;
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}



function __tsGetFn(str: string) {
  const noSpaces = str.replaceAll(' ', '');
  const __tsFnWithArgs = /(function.*\(.*\))/
  const result = __tsFnWithArgs.exec(noSpaces);
  if(result?.length) {
    
    const fn = result.at(-1);
    const afterKey = fn.substring('function'.length);
    return 'function ' + afterKey;
  }
  return undefined;
}

function __tsGetArrowFn(str: string) {
  const noSpaces = str.replaceAll(' ', '');
  const __tsArrowWithArgs= /(\({0,1}[A-Za-z]{1}[A-Za-z0-9_,]*\){0,1})=>/;
const __tsArrorWithoutArgs = /\(\){1}=>/;
  const arrowWithArgsResult = __tsArrowWithArgs.exec(noSpaces);
  if(arrowWithArgsResult?.length) {
    const args =  arrowWithArgsResult.at(-1);
    return 'arrow fn(' + args + ')';
  }
  const arrowWithoutArgsResult = __tsArrorWithoutArgs.exec(noSpaces);
  if(arrowWithoutArgsResult?.length) {
    return 'arrow fn()';
  }
  return undefined;
}

function tryToStringify(value: any) {
    let res = '';
    try {
        switch(typeof value) {
            case 'object':
                res = stringify(value);
                break;
            case 'function':
                res = __tsGetFn(value.toString()) ?? __tsGetArrowFn(value.toString());
                break;
            case 'bigint':
                res = value?.toString();
                break;    
            default: 
                // isNaN
                if(value !== value) {
                  res = value?.toString();
                } else {
                  res = value === undefined ? '__TS_WORKSHEET_UNDEFINED__' : value;
                }
        }
    } catch(err: any) {
        return err?.message.startsWith('Convert') ? 'Non displayable' : err?.message;
    }
    return res?.length > 2000 ? res?.substring(0, 2000) : res;
}

function __onError(error: any, dataValue: any) {
  const fixedError = error?.stack ?? error;
  const stringError = JSON.stringify(fixedError, Object.getOwnPropertyNames(fixedError));

  dataValue.type = 'error';
  dataValue.called = [error.message , stringError];
}
function save(hide: boolean, dataValue?: any) {
  if(hide) {
    return;
  }
  const isIpcCompatible = !false && typeof Bun === 'undefined' && !globalThis?.Deno && !os.platform().startsWith('win');
  if(dataValue) {
    dataFile.push(dataValue);
  }

  if(isIpcCompatible) {
    process.send(dataValue);
  }

  if(!dataValue && !isIpcCompatible) {
    __fs.writeFileSync('c:\\Users\\joyde\\OneDrive\\Documents\\DevTinder\\src\\router\\.ws.data.json', JSON.stringify(dataFile));  
  }
}

function tsWorksheetWatch(data: {stringed: string, hide?: boolean, type: string, variable?: string, called: () => any, line: number }) {
  const dataValue = {...data, called: 'Failed Promise. Please use a .catch to display it'};
  let called: any;
  try {
      called = data.called();
  } catch(error) {
      __onError(error, dataValue);
      save(data.hide, dataValue);
      throw error;
  }

  if(data.type === 'throw') {
      __onError(called, dataValue);
      save(data.hide, dataValue);
      throw called;
  }

  if(called?.then) {
     data.called = called.then((r: any) => {
      dataValue.prefix = 'Resolved Promise: ';
        dataValue.called = tryToStringify(r);
         save(data.hide, dataValue);
         return r;
     }).catch((err: any) => {
      dataValue.prefix = 'Rejected Promise: ';
      dataValue.called = tryToStringify(err);
      dataValue.type = 'error';
      save(data.hide, dataValue);
      throw err;
     });
  } else {
      dataValue.called = tryToStringify(called);
      save(data.hide, dataValue);
  }

  return called;
}

function mylog(logFn: any, data: {type: string, called: any[], line: number }) {
    logFn(...data.called);
    data.called = data.called.map(entry => tryToStringify(entry)); 
    save(false, data);
}

if (globalThis?.Deno) {

  addEventListener("error", (event) => {
    event.preventDefault();
  });
  
  addEventListener("unhandledrejection", (e) => {
    e.preventDefault();
  });
  
  addEventListener("unload", () => {
    save(false);
  });
  }
  process?.on('uncaughtException', (error: Error) => {   
  });
  
  process?.on('unhandledRejection', () => {})
  
  process?.on('beforeExit', e => {
    if(typeof Bun !== 'undefined' && dataFile.some(e => e.type === 'error')) {
      process.exit(0);
    }
  })
  
  process?.on('exit', function() {
    save(false);
  });
      
    