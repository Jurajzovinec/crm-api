# Crm API

## Prerequisites

- docker and docker-compose installed
- ports 3000 and 5432 available

## Usage

1. Start app using:

- `npm run docker:up`

2. Play with [API documentation](http://localhost:3000/api)

3. Login to POSTGRES database using credentials from [dockerfile](./db/Dockerfile)

4. Stop app using:

- `npm run docker:down`

<div align="center">
  <a href="https://www.youtube.com/watch?v=1Bxovpm0wQY"><img src="https://img.youtube.com/vi/1Bxovpm0wQY/0.jpg" alt="IMAGE ALT TEXT"></a>
</div>

## Task handle process description

## Objective:

_The goal of this task is to create a simple REST API for a Customer Relationship Management (CRM) system. The API should allow the creation, retrieval, update, and deletion (CRUD operations) of leads. The leads should be stored in a PostgreSQL database._

The application was built using NestJs, Postgres, and Docker. CRUD endpoints are located in [controller file](src/api/leads/leads.controller.ts). Methods handling data manipulation are located in [service file](src/api/leads/leads.service.ts).
`Lead` table is defined using [schema.prisma file](prisma/schema.prisma). The migration was generated and applied to Postgres database using `npx prisma migrate:dev`. Eventually, generated migration sql commands have been stored to [init.sql file](db/init.sql) to run these commands with each setup of Postgres database.

## Functional Requirements:

_1. Create a lead: The API should allow the creation of a new lead. A lead should have the following properties:
id: A unique identifier.
firstName: The first name of the lead.
lastName: The last name of the lead.
email: The email address of the lead.
phone: The phone number of the lead.
source: The source of the lead (e.g., website, referral, etc.)
status: The status of the lead (e.g., new, contacted, converted, lost, etc.)_

Lead object is created and stored into database using `create` method.

```ts
  @Post()
  @ApiBody({ type: CreateLeadDto })
  public create(@Body(StandardizePhoneNumberPipe) createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }
```

@Body arguments is defined by `CreateLeadDto`:

```ts
export class CreateLeadDto implements Omit<Lead, 'id'> {
  @ApiProperty()
  @IsString({ message: 'firstName must be a string' })
  @MaxLength(50, { message: 'firstName must be shorter than or equal to 50 characters' })
  public readonly firstName: string;

  ...

  @ApiProperty()
  @IsString({ message: 'phone must be a string' })
  @MaxLength(50, { message: 'phone must be shorter than or equal to 50 characters' })
  @IsPhoneNumberValid()
  public phone: string;

  ...
}
```

`CreateLeadDto` is decorated with a bunch of validators and swagger notations. For validation of `phone` field [dedicated validator](src/api/leads/decorators/phone-number.validator.ts) has been created. This validator is using 3rd party library to properly validate phone numbers.

Create method above uses also [StandardizePhoneNumberPipe](src/api/leads/decorators/standardize-phone-number.pipe.ts) which runs after data validation. This pipe standardizes the number format before saving it into DB

_2. Retrieve leads: The API should allow the retrieval of all leads and a single lead by its ID. It should also support retrieval of leads by source and status._

Leads are retrieved using two endpoints.

```ts
  @Get()
  @ApiQuery({
    name: 'source',
    required: false,
    type: String,
    enum: LEAD_SOURCES
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: LEAD_STATUSES
  })
  public findAll(@Query() input: GetLeadsInputDto) {
    return this.leadsService.find(input);
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.findOne(id);
  }
```

Query arguments `source` and `status` are guarded and validated using `dto` file. Fields are marked using `@Optional()` decorator to turn off ValidationPipe when the fields are not set.

```ts
export class GetLeadsInputDto implements Partial<Pick<Lead, 'source' | 'status'>> {
  @IsOptional()
  @IsIn(LEAD_SOURCES, { message: `source must be on of Lead sources (${LEAD_SOURCES})` })
  public readonly source?: Lead['source'];

  @IsOptional()
  @IsIn(LEAD_STATUSES, { message: `status must be on of Lead statuses (${LEAD_STATUSES})` })
  public readonly status?: Lead['status'];
}
```

Thanks to the strict implementation of the `Lead` ORM model, `GetLeadsInputDto` object is compatible with Prisma ORM, and no transformation is required when querying data with `WHERE` statements:

```ts
  public find(input: GetLeadsInputDto): Promise<Lead[]> {
    return this.prisma.lead.findMany({ where: input });
  }
```

_3. Update a lead: The API should allow the updating of a lead's properties by its ID._

Lead is updated using `update` method.

```ts
  @Patch(':id')
  @ApiBody({ type: UpdateLeadDto })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body(StandardizePhoneNumberPipe) updateLeadDto: UpdateLeadDto
  ) {
    return this.leadsService.update(id, updateLeadDto);
  }
```

In this case, input dto is simplified using `PartialType` mapped type provided by NestJs.

```ts
export class UpdateLeadDto extends PartialType(CreateLeadDto) {}
```

Similar to create, the update method is also taking advantage of `StandardizePhoneNumberPipe`.

_4. Delete a lead: The API should allow the deletion of a lead by its ID._

```ts
  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.remove(id);
  }
```

## Technical Requirements:

_The task should be implemented using NestJS as the backend framework and PostgreSQL as the database._

The task is built using NestJs and Postgres. See [docker-compose](docker-compose.yml) file.

_Use Prisma for database interaction_

Project is using Prisma as go to ORM and migrations manager

```ts
@Injectable()
export class LeadsService {
  public constructor(private readonly prisma: PrismaService) {}
```

_Use class-validator for validation of input data._

Input DTOs are validated using validation pipe which is enabled and configured in `main.ts` file

```ts
app.useGlobalPipes(
  new ValidationPipe({ forbidUnknownValues: true, whitelist: true, transform: true })
);
```

_Include error handling (e.g., trying to update or delete a non-existent lead)._

Cases as invalid phone number or wrong DTO types are validated using `ValidationPipe`.

Lead existence is validated using private method:

```ts
  private async validateIfLeadExists(id: number) {
    if (!(await this.prisma.lead.findUnique({ where: { id } }))) {
      throw new NotFoundException(`Lead with id ${id} not found`);
    }
  }
```

Error handling is not leveraged by customized [exception filter](https://docs.nestjs.com/exception-filters), where error serialization and alerting would be handled.

## Deliverables

- [Github repository](https://github.com/Jurajzovinec/crm-api)
- swagger available on http://localhost:3000/api
