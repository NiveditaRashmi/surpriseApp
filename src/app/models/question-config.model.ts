export interface SurpriseAppConfig {
    Apptitle: string;
    LandingPage: LandingPage;
    PaymentLinkUrl: string;
    StartQuestionId: string,
    Questions: Question[];
    EndingPage: EndingPage;
}

export interface LandingPage {
    Title: string;
    Description: string;
    ButtonText: string;
}

export interface Question {
    Id: string;
    QuestionText: string;
    Options?: QuestionOption[];
}

export type ButtonMovement = 'dancing' | 'bouncing' | 'spinning' | 'none';

export interface QuestionOption  {
    ButtonText: string;
    ButtonStyle: string;
    ButtonTextColor: string;
    ButtonMovement: ButtonMovement;
    Clickable: boolean;
    Dodge?: boolean; // Optional property to indicate if the button should dodge
    NextQuestionId?: string;
}

export interface EndingPage {
    Title: string;
    Description: string;
    ButtonText: string;
}