export class Project {
    projectNo: number;
    projectName: string;
    projectKey: string;
    projectDescription: string;
}

export class Scenario {
    scenarioNo: number;
    scenarioName: string;
    scenarioDescription: string;
    projectKey: string;
    steps: Step[];
}

export class Step {
    stepNo: number;
    scenarioNo: number;
    projectKey: string;
    stepName: string;
    stepDescription: string;
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
    isFaulted: boolean;
    exceptionType: string;
    exception: string;
    invocationSignature: string;
    requestIdentifierKey: string;
    requestDisplayInfo: string;
    responseDisplayInfo: string;
    isReplayable: boolean;
    invocationIndex: number;
    hashCode: string;
    deepHashCode: string;
    instanceHashCode: string;
    parentInstanceHashCode: string;
    assertionResult: string;
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