export class Project {
    projectNo: number;
    projectName: string;
    projectKey: string;
    projectDescription: string;
    invocationMatchStrategy: InvocationMatch;
}

export class Scenario {
    scenarioNo: number;
    scenarioName: string;
    scenarioDescription: string;
    projectKey: string;
    createdOn: Date;
    invocationMatchStrategy: InvocationMatch;
    steps: Step[];
}

export class Step {
    stepNo: number;
    scenarioNo: number;
    projectKey: string;
    stepName: string;
    stepDescription: string;
    createdOn: Date;
    invocationMatchStrategy: InvocationMatch;
    rootInvocationReflectedType: string;
    invocations: Invocation[];
}

export class Invocation {
    projectKey: string;
    scenarioNo: number;
    stepNo: number;
    depth: number;
    duration: number;
    request: string;
    requestRaw: string;
    response: string;
    responseType: string;
    reflectedType: string;
    isFaulted: boolean;
    exceptionType: string;
    exception: string;
    invocationSignature: string;
    requestIdentifierKey: string;
    requestDisplayInfo: string;
    responseDisplayInfo: string;
    isReplayable: boolean;
    invocationIndex: number;
    signatureHashCode: string;
    requestHashCode: string;
    deepHashCode: string;
    leafHashCode: string;
    instanceHashCode: string;
    parentInstanceHashCode: string;
    assertionResult: string;
    recordedOn: Date;
}

export class Assertion {
    projectKey: string;
    scenarioNo: number;
    stepNo: number;
    expected: string;
    status: AssertionStatus;
    lastAssertedOn: Date;
    duration: number;
    title: string;
    lastAssertionResult: string;
}

export enum AssertionStatus {
    NotAsserted = 0,
    Success = 1,
    Fail = 2
}

export enum InvocationMatch {
    Inherit = 0, //inherits strategy from parent object, this is default
    Signature = 10, //matches invocation by method signature
    Request = 20, //matches invocation by method signature + request identifier key
    Depth = 30, //matches invocation using deep hash code
    Sibling = 40, //matches invocation with same parent using leaf hash code
    Exact = 50, //matches exact invocation by using invocation instance hash code
}