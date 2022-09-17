export class NoVacancy extends Error {
  constructor(message: string) {
    super(`No Vacancy: ${message}`);
    this.name = 'NoVacancyError';
  }
}

export class ExceedsTotalVacancies extends Error {
  constructor(message: string) {
    super(`Exceeds Total Vacancies: ${message}`);
    this.name = 'ExceedsTotalVacanciesError';
  }
}
