
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Collecte
 * 
 */
export type Collecte = $Result.DefaultSelection<Prisma.$CollectePayload>
/**
 * Model Don
 * 
 */
export type Don = $Result.DefaultSelection<Prisma.$DonPayload>
/**
 * Model Retrait
 * 
 */
export type Retrait = $Result.DefaultSelection<Prisma.$RetraitPayload>
/**
 * Model Update
 * 
 */
export type Update = $Result.DefaultSelection<Prisma.$UpdatePayload>
/**
 * Model Signalement
 * 
 */
export type Signalement = $Result.DefaultSelection<Prisma.$SignalementPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const CollecteStatus: {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  REPORTED: 'REPORTED'
};

export type CollecteStatus = (typeof CollecteStatus)[keyof typeof CollecteStatus]


export const Category: {
  SANTE: 'SANTE',
  RELIGION: 'RELIGION',
  EDUCATION: 'EDUCATION',
  SPORT: 'SPORT',
  EVENEMENT: 'EVENEMENT',
  COTISATION: 'COTISATION',
  CADEAU: 'CADEAU',
  URGENCE: 'URGENCE'
};

export type Category = (typeof Category)[keyof typeof Category]


export const PaymentStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const WithdrawalStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

export type WithdrawalStatus = (typeof WithdrawalStatus)[keyof typeof WithdrawalStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type CollecteStatus = $Enums.CollecteStatus

export const CollecteStatus: typeof $Enums.CollecteStatus

export type Category = $Enums.Category

export const Category: typeof $Enums.Category

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type WithdrawalStatus = $Enums.WithdrawalStatus

export const WithdrawalStatus: typeof $Enums.WithdrawalStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collecte`: Exposes CRUD operations for the **Collecte** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collectes
    * const collectes = await prisma.collecte.findMany()
    * ```
    */
  get collecte(): Prisma.CollecteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.don`: Exposes CRUD operations for the **Don** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dons
    * const dons = await prisma.don.findMany()
    * ```
    */
  get don(): Prisma.DonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.retrait`: Exposes CRUD operations for the **Retrait** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Retraits
    * const retraits = await prisma.retrait.findMany()
    * ```
    */
  get retrait(): Prisma.RetraitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.update`: Exposes CRUD operations for the **Update** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Updates
    * const updates = await prisma.update.findMany()
    * ```
    */
  get update(): Prisma.UpdateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.signalement`: Exposes CRUD operations for the **Signalement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Signalements
    * const signalements = await prisma.signalement.findMany()
    * ```
    */
  get signalement(): Prisma.SignalementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Collecte: 'Collecte',
    Don: 'Don',
    Retrait: 'Retrait',
    Update: 'Update',
    Signalement: 'Signalement'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "collecte" | "don" | "retrait" | "update" | "signalement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Collecte: {
        payload: Prisma.$CollectePayload<ExtArgs>
        fields: Prisma.CollecteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollecteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollecteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>
          }
          findFirst: {
            args: Prisma.CollecteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollecteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>
          }
          findMany: {
            args: Prisma.CollecteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>[]
          }
          create: {
            args: Prisma.CollecteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>
          }
          createMany: {
            args: Prisma.CollecteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollecteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>[]
          }
          delete: {
            args: Prisma.CollecteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>
          }
          update: {
            args: Prisma.CollecteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>
          }
          deleteMany: {
            args: Prisma.CollecteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollecteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollecteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>[]
          }
          upsert: {
            args: Prisma.CollecteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectePayload>
          }
          aggregate: {
            args: Prisma.CollecteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollecte>
          }
          groupBy: {
            args: Prisma.CollecteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollecteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollecteCountArgs<ExtArgs>
            result: $Utils.Optional<CollecteCountAggregateOutputType> | number
          }
        }
      }
      Don: {
        payload: Prisma.$DonPayload<ExtArgs>
        fields: Prisma.DonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>
          }
          findFirst: {
            args: Prisma.DonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>
          }
          findMany: {
            args: Prisma.DonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>[]
          }
          create: {
            args: Prisma.DonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>
          }
          createMany: {
            args: Prisma.DonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>[]
          }
          delete: {
            args: Prisma.DonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>
          }
          update: {
            args: Prisma.DonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>
          }
          deleteMany: {
            args: Prisma.DonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>[]
          }
          upsert: {
            args: Prisma.DonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonPayload>
          }
          aggregate: {
            args: Prisma.DonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDon>
          }
          groupBy: {
            args: Prisma.DonGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonCountArgs<ExtArgs>
            result: $Utils.Optional<DonCountAggregateOutputType> | number
          }
        }
      }
      Retrait: {
        payload: Prisma.$RetraitPayload<ExtArgs>
        fields: Prisma.RetraitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RetraitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RetraitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>
          }
          findFirst: {
            args: Prisma.RetraitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RetraitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>
          }
          findMany: {
            args: Prisma.RetraitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>[]
          }
          create: {
            args: Prisma.RetraitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>
          }
          createMany: {
            args: Prisma.RetraitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RetraitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>[]
          }
          delete: {
            args: Prisma.RetraitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>
          }
          update: {
            args: Prisma.RetraitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>
          }
          deleteMany: {
            args: Prisma.RetraitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RetraitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RetraitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>[]
          }
          upsert: {
            args: Prisma.RetraitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetraitPayload>
          }
          aggregate: {
            args: Prisma.RetraitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRetrait>
          }
          groupBy: {
            args: Prisma.RetraitGroupByArgs<ExtArgs>
            result: $Utils.Optional<RetraitGroupByOutputType>[]
          }
          count: {
            args: Prisma.RetraitCountArgs<ExtArgs>
            result: $Utils.Optional<RetraitCountAggregateOutputType> | number
          }
        }
      }
      Update: {
        payload: Prisma.$UpdatePayload<ExtArgs>
        fields: Prisma.UpdateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UpdateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UpdateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>
          }
          findFirst: {
            args: Prisma.UpdateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UpdateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>
          }
          findMany: {
            args: Prisma.UpdateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>[]
          }
          create: {
            args: Prisma.UpdateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>
          }
          createMany: {
            args: Prisma.UpdateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UpdateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>[]
          }
          delete: {
            args: Prisma.UpdateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>
          }
          update: {
            args: Prisma.UpdateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>
          }
          deleteMany: {
            args: Prisma.UpdateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UpdateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UpdateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>[]
          }
          upsert: {
            args: Prisma.UpdateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdatePayload>
          }
          aggregate: {
            args: Prisma.UpdateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUpdate>
          }
          groupBy: {
            args: Prisma.UpdateGroupByArgs<ExtArgs>
            result: $Utils.Optional<UpdateGroupByOutputType>[]
          }
          count: {
            args: Prisma.UpdateCountArgs<ExtArgs>
            result: $Utils.Optional<UpdateCountAggregateOutputType> | number
          }
        }
      }
      Signalement: {
        payload: Prisma.$SignalementPayload<ExtArgs>
        fields: Prisma.SignalementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignalementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignalementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>
          }
          findFirst: {
            args: Prisma.SignalementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignalementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>
          }
          findMany: {
            args: Prisma.SignalementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>[]
          }
          create: {
            args: Prisma.SignalementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>
          }
          createMany: {
            args: Prisma.SignalementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignalementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>[]
          }
          delete: {
            args: Prisma.SignalementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>
          }
          update: {
            args: Prisma.SignalementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>
          }
          deleteMany: {
            args: Prisma.SignalementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignalementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SignalementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>[]
          }
          upsert: {
            args: Prisma.SignalementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalementPayload>
          }
          aggregate: {
            args: Prisma.SignalementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignalement>
          }
          groupBy: {
            args: Prisma.SignalementGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignalementGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignalementCountArgs<ExtArgs>
            result: $Utils.Optional<SignalementCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    collecte?: CollecteOmit
    don?: DonOmit
    retrait?: RetraitOmit
    update?: UpdateOmit
    signalement?: SignalementOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    collectes: number
    retraits: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collectes?: boolean | UserCountOutputTypeCountCollectesArgs
    retraits?: boolean | UserCountOutputTypeCountRetraitsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCollectesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollecteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRetraitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetraitWhereInput
  }


  /**
   * Count Type CollecteCountOutputType
   */

  export type CollecteCountOutputType = {
    dons: number
    updates: number
    signalements: number
    retraits: number
  }

  export type CollecteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dons?: boolean | CollecteCountOutputTypeCountDonsArgs
    updates?: boolean | CollecteCountOutputTypeCountUpdatesArgs
    signalements?: boolean | CollecteCountOutputTypeCountSignalementsArgs
    retraits?: boolean | CollecteCountOutputTypeCountRetraitsArgs
  }

  // Custom InputTypes
  /**
   * CollecteCountOutputType without action
   */
  export type CollecteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollecteCountOutputType
     */
    select?: CollecteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CollecteCountOutputType without action
   */
  export type CollecteCountOutputTypeCountDonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonWhereInput
  }

  /**
   * CollecteCountOutputType without action
   */
  export type CollecteCountOutputTypeCountUpdatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpdateWhereInput
  }

  /**
   * CollecteCountOutputType without action
   */
  export type CollecteCountOutputTypeCountSignalementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalementWhereInput
  }

  /**
   * CollecteCountOutputType without action
   */
  export type CollecteCountOutputTypeCountRetraitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetraitWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    phone: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    phone: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    phone?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    phone?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    phone?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    phone: string
    name: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    collectes?: boolean | User$collectesArgs<ExtArgs>
    retraits?: boolean | User$retraitsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collectes?: boolean | User$collectesArgs<ExtArgs>
    retraits?: boolean | User$retraitsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      collectes: Prisma.$CollectePayload<ExtArgs>[]
      retraits: Prisma.$RetraitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      name: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collectes<T extends User$collectesArgs<ExtArgs> = {}>(args?: Subset<T, User$collectesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    retraits<T extends User$retraitsArgs<ExtArgs> = {}>(args?: Subset<T, User$retraitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.collectes
   */
  export type User$collectesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    where?: CollecteWhereInput
    orderBy?: CollecteOrderByWithRelationInput | CollecteOrderByWithRelationInput[]
    cursor?: CollecteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollecteScalarFieldEnum | CollecteScalarFieldEnum[]
  }

  /**
   * User.retraits
   */
  export type User$retraitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    where?: RetraitWhereInput
    orderBy?: RetraitOrderByWithRelationInput | RetraitOrderByWithRelationInput[]
    cursor?: RetraitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RetraitScalarFieldEnum | RetraitScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Collecte
   */

  export type AggregateCollecte = {
    _count: CollecteCountAggregateOutputType | null
    _avg: CollecteAvgAggregateOutputType | null
    _sum: CollecteSumAggregateOutputType | null
    _min: CollecteMinAggregateOutputType | null
    _max: CollecteMaxAggregateOutputType | null
  }

  export type CollecteAvgAggregateOutputType = {
    targetXof: number | null
    collectedXof: number | null
  }

  export type CollecteSumAggregateOutputType = {
    targetXof: number | null
    collectedXof: number | null
  }

  export type CollecteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    slug: string | null
    title: string | null
    description: string | null
    category: $Enums.Category | null
    targetXof: number | null
    collectedXof: number | null
    endDate: Date | null
    status: $Enums.CollecteStatus | null
    photoUrl: string | null
    verifiedBadge: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollecteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    slug: string | null
    title: string | null
    description: string | null
    category: $Enums.Category | null
    targetXof: number | null
    collectedXof: number | null
    endDate: Date | null
    status: $Enums.CollecteStatus | null
    photoUrl: string | null
    verifiedBadge: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollecteCountAggregateOutputType = {
    id: number
    userId: number
    slug: number
    title: number
    description: number
    category: number
    targetXof: number
    collectedXof: number
    endDate: number
    status: number
    photoUrl: number
    verifiedBadge: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CollecteAvgAggregateInputType = {
    targetXof?: true
    collectedXof?: true
  }

  export type CollecteSumAggregateInputType = {
    targetXof?: true
    collectedXof?: true
  }

  export type CollecteMinAggregateInputType = {
    id?: true
    userId?: true
    slug?: true
    title?: true
    description?: true
    category?: true
    targetXof?: true
    collectedXof?: true
    endDate?: true
    status?: true
    photoUrl?: true
    verifiedBadge?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollecteMaxAggregateInputType = {
    id?: true
    userId?: true
    slug?: true
    title?: true
    description?: true
    category?: true
    targetXof?: true
    collectedXof?: true
    endDate?: true
    status?: true
    photoUrl?: true
    verifiedBadge?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollecteCountAggregateInputType = {
    id?: true
    userId?: true
    slug?: true
    title?: true
    description?: true
    category?: true
    targetXof?: true
    collectedXof?: true
    endDate?: true
    status?: true
    photoUrl?: true
    verifiedBadge?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CollecteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collecte to aggregate.
     */
    where?: CollecteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectes to fetch.
     */
    orderBy?: CollecteOrderByWithRelationInput | CollecteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollecteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collectes
    **/
    _count?: true | CollecteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CollecteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CollecteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollecteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollecteMaxAggregateInputType
  }

  export type GetCollecteAggregateType<T extends CollecteAggregateArgs> = {
        [P in keyof T & keyof AggregateCollecte]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollecte[P]>
      : GetScalarType<T[P], AggregateCollecte[P]>
  }




  export type CollecteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollecteWhereInput
    orderBy?: CollecteOrderByWithAggregationInput | CollecteOrderByWithAggregationInput[]
    by: CollecteScalarFieldEnum[] | CollecteScalarFieldEnum
    having?: CollecteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollecteCountAggregateInputType | true
    _avg?: CollecteAvgAggregateInputType
    _sum?: CollecteSumAggregateInputType
    _min?: CollecteMinAggregateInputType
    _max?: CollecteMaxAggregateInputType
  }

  export type CollecteGroupByOutputType = {
    id: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof: number
    endDate: Date
    status: $Enums.CollecteStatus
    photoUrl: string | null
    verifiedBadge: boolean
    createdAt: Date
    updatedAt: Date
    _count: CollecteCountAggregateOutputType | null
    _avg: CollecteAvgAggregateOutputType | null
    _sum: CollecteSumAggregateOutputType | null
    _min: CollecteMinAggregateOutputType | null
    _max: CollecteMaxAggregateOutputType | null
  }

  type GetCollecteGroupByPayload<T extends CollecteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollecteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollecteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollecteGroupByOutputType[P]>
            : GetScalarType<T[P], CollecteGroupByOutputType[P]>
        }
      >
    >


  export type CollecteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    targetXof?: boolean
    collectedXof?: boolean
    endDate?: boolean
    status?: boolean
    photoUrl?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dons?: boolean | Collecte$donsArgs<ExtArgs>
    updates?: boolean | Collecte$updatesArgs<ExtArgs>
    signalements?: boolean | Collecte$signalementsArgs<ExtArgs>
    retraits?: boolean | Collecte$retraitsArgs<ExtArgs>
    _count?: boolean | CollecteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collecte"]>

  export type CollecteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    targetXof?: boolean
    collectedXof?: boolean
    endDate?: boolean
    status?: boolean
    photoUrl?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collecte"]>

  export type CollecteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    targetXof?: boolean
    collectedXof?: boolean
    endDate?: boolean
    status?: boolean
    photoUrl?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collecte"]>

  export type CollecteSelectScalar = {
    id?: boolean
    userId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    targetXof?: boolean
    collectedXof?: boolean
    endDate?: boolean
    status?: boolean
    photoUrl?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CollecteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "slug" | "title" | "description" | "category" | "targetXof" | "collectedXof" | "endDate" | "status" | "photoUrl" | "verifiedBadge" | "createdAt" | "updatedAt", ExtArgs["result"]["collecte"]>
  export type CollecteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dons?: boolean | Collecte$donsArgs<ExtArgs>
    updates?: boolean | Collecte$updatesArgs<ExtArgs>
    signalements?: boolean | Collecte$signalementsArgs<ExtArgs>
    retraits?: boolean | Collecte$retraitsArgs<ExtArgs>
    _count?: boolean | CollecteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CollecteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CollecteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CollectePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collecte"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      dons: Prisma.$DonPayload<ExtArgs>[]
      updates: Prisma.$UpdatePayload<ExtArgs>[]
      signalements: Prisma.$SignalementPayload<ExtArgs>[]
      retraits: Prisma.$RetraitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      slug: string
      title: string
      description: string
      category: $Enums.Category
      targetXof: number
      collectedXof: number
      endDate: Date
      status: $Enums.CollecteStatus
      photoUrl: string | null
      verifiedBadge: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["collecte"]>
    composites: {}
  }

  type CollecteGetPayload<S extends boolean | null | undefined | CollecteDefaultArgs> = $Result.GetResult<Prisma.$CollectePayload, S>

  type CollecteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollecteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollecteCountAggregateInputType | true
    }

  export interface CollecteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collecte'], meta: { name: 'Collecte' } }
    /**
     * Find zero or one Collecte that matches the filter.
     * @param {CollecteFindUniqueArgs} args - Arguments to find a Collecte
     * @example
     * // Get one Collecte
     * const collecte = await prisma.collecte.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollecteFindUniqueArgs>(args: SelectSubset<T, CollecteFindUniqueArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collecte that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollecteFindUniqueOrThrowArgs} args - Arguments to find a Collecte
     * @example
     * // Get one Collecte
     * const collecte = await prisma.collecte.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollecteFindUniqueOrThrowArgs>(args: SelectSubset<T, CollecteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collecte that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteFindFirstArgs} args - Arguments to find a Collecte
     * @example
     * // Get one Collecte
     * const collecte = await prisma.collecte.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollecteFindFirstArgs>(args?: SelectSubset<T, CollecteFindFirstArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collecte that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteFindFirstOrThrowArgs} args - Arguments to find a Collecte
     * @example
     * // Get one Collecte
     * const collecte = await prisma.collecte.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollecteFindFirstOrThrowArgs>(args?: SelectSubset<T, CollecteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collectes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collectes
     * const collectes = await prisma.collecte.findMany()
     * 
     * // Get first 10 Collectes
     * const collectes = await prisma.collecte.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collecteWithIdOnly = await prisma.collecte.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollecteFindManyArgs>(args?: SelectSubset<T, CollecteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collecte.
     * @param {CollecteCreateArgs} args - Arguments to create a Collecte.
     * @example
     * // Create one Collecte
     * const Collecte = await prisma.collecte.create({
     *   data: {
     *     // ... data to create a Collecte
     *   }
     * })
     * 
     */
    create<T extends CollecteCreateArgs>(args: SelectSubset<T, CollecteCreateArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collectes.
     * @param {CollecteCreateManyArgs} args - Arguments to create many Collectes.
     * @example
     * // Create many Collectes
     * const collecte = await prisma.collecte.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollecteCreateManyArgs>(args?: SelectSubset<T, CollecteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collectes and returns the data saved in the database.
     * @param {CollecteCreateManyAndReturnArgs} args - Arguments to create many Collectes.
     * @example
     * // Create many Collectes
     * const collecte = await prisma.collecte.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collectes and only return the `id`
     * const collecteWithIdOnly = await prisma.collecte.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollecteCreateManyAndReturnArgs>(args?: SelectSubset<T, CollecteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collecte.
     * @param {CollecteDeleteArgs} args - Arguments to delete one Collecte.
     * @example
     * // Delete one Collecte
     * const Collecte = await prisma.collecte.delete({
     *   where: {
     *     // ... filter to delete one Collecte
     *   }
     * })
     * 
     */
    delete<T extends CollecteDeleteArgs>(args: SelectSubset<T, CollecteDeleteArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collecte.
     * @param {CollecteUpdateArgs} args - Arguments to update one Collecte.
     * @example
     * // Update one Collecte
     * const collecte = await prisma.collecte.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollecteUpdateArgs>(args: SelectSubset<T, CollecteUpdateArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collectes.
     * @param {CollecteDeleteManyArgs} args - Arguments to filter Collectes to delete.
     * @example
     * // Delete a few Collectes
     * const { count } = await prisma.collecte.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollecteDeleteManyArgs>(args?: SelectSubset<T, CollecteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collectes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collectes
     * const collecte = await prisma.collecte.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollecteUpdateManyArgs>(args: SelectSubset<T, CollecteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collectes and returns the data updated in the database.
     * @param {CollecteUpdateManyAndReturnArgs} args - Arguments to update many Collectes.
     * @example
     * // Update many Collectes
     * const collecte = await prisma.collecte.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collectes and only return the `id`
     * const collecteWithIdOnly = await prisma.collecte.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollecteUpdateManyAndReturnArgs>(args: SelectSubset<T, CollecteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collecte.
     * @param {CollecteUpsertArgs} args - Arguments to update or create a Collecte.
     * @example
     * // Update or create a Collecte
     * const collecte = await prisma.collecte.upsert({
     *   create: {
     *     // ... data to create a Collecte
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collecte we want to update
     *   }
     * })
     */
    upsert<T extends CollecteUpsertArgs>(args: SelectSubset<T, CollecteUpsertArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collectes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteCountArgs} args - Arguments to filter Collectes to count.
     * @example
     * // Count the number of Collectes
     * const count = await prisma.collecte.count({
     *   where: {
     *     // ... the filter for the Collectes we want to count
     *   }
     * })
    **/
    count<T extends CollecteCountArgs>(
      args?: Subset<T, CollecteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollecteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collecte.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollecteAggregateArgs>(args: Subset<T, CollecteAggregateArgs>): Prisma.PrismaPromise<GetCollecteAggregateType<T>>

    /**
     * Group by Collecte.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollecteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollecteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollecteGroupByArgs['orderBy'] }
        : { orderBy?: CollecteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollecteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollecteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collecte model
   */
  readonly fields: CollecteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collecte.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollecteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dons<T extends Collecte$donsArgs<ExtArgs> = {}>(args?: Subset<T, Collecte$donsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updates<T extends Collecte$updatesArgs<ExtArgs> = {}>(args?: Subset<T, Collecte$updatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    signalements<T extends Collecte$signalementsArgs<ExtArgs> = {}>(args?: Subset<T, Collecte$signalementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    retraits<T extends Collecte$retraitsArgs<ExtArgs> = {}>(args?: Subset<T, Collecte$retraitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collecte model
   */
  interface CollecteFieldRefs {
    readonly id: FieldRef<"Collecte", 'String'>
    readonly userId: FieldRef<"Collecte", 'String'>
    readonly slug: FieldRef<"Collecte", 'String'>
    readonly title: FieldRef<"Collecte", 'String'>
    readonly description: FieldRef<"Collecte", 'String'>
    readonly category: FieldRef<"Collecte", 'Category'>
    readonly targetXof: FieldRef<"Collecte", 'Int'>
    readonly collectedXof: FieldRef<"Collecte", 'Int'>
    readonly endDate: FieldRef<"Collecte", 'DateTime'>
    readonly status: FieldRef<"Collecte", 'CollecteStatus'>
    readonly photoUrl: FieldRef<"Collecte", 'String'>
    readonly verifiedBadge: FieldRef<"Collecte", 'Boolean'>
    readonly createdAt: FieldRef<"Collecte", 'DateTime'>
    readonly updatedAt: FieldRef<"Collecte", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Collecte findUnique
   */
  export type CollecteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * Filter, which Collecte to fetch.
     */
    where: CollecteWhereUniqueInput
  }

  /**
   * Collecte findUniqueOrThrow
   */
  export type CollecteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * Filter, which Collecte to fetch.
     */
    where: CollecteWhereUniqueInput
  }

  /**
   * Collecte findFirst
   */
  export type CollecteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * Filter, which Collecte to fetch.
     */
    where?: CollecteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectes to fetch.
     */
    orderBy?: CollecteOrderByWithRelationInput | CollecteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collectes.
     */
    cursor?: CollecteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collectes.
     */
    distinct?: CollecteScalarFieldEnum | CollecteScalarFieldEnum[]
  }

  /**
   * Collecte findFirstOrThrow
   */
  export type CollecteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * Filter, which Collecte to fetch.
     */
    where?: CollecteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectes to fetch.
     */
    orderBy?: CollecteOrderByWithRelationInput | CollecteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collectes.
     */
    cursor?: CollecteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collectes.
     */
    distinct?: CollecteScalarFieldEnum | CollecteScalarFieldEnum[]
  }

  /**
   * Collecte findMany
   */
  export type CollecteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * Filter, which Collectes to fetch.
     */
    where?: CollecteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectes to fetch.
     */
    orderBy?: CollecteOrderByWithRelationInput | CollecteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collectes.
     */
    cursor?: CollecteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collectes.
     */
    distinct?: CollecteScalarFieldEnum | CollecteScalarFieldEnum[]
  }

  /**
   * Collecte create
   */
  export type CollecteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * The data needed to create a Collecte.
     */
    data: XOR<CollecteCreateInput, CollecteUncheckedCreateInput>
  }

  /**
   * Collecte createMany
   */
  export type CollecteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collectes.
     */
    data: CollecteCreateManyInput | CollecteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collecte createManyAndReturn
   */
  export type CollecteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * The data used to create many Collectes.
     */
    data: CollecteCreateManyInput | CollecteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Collecte update
   */
  export type CollecteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * The data needed to update a Collecte.
     */
    data: XOR<CollecteUpdateInput, CollecteUncheckedUpdateInput>
    /**
     * Choose, which Collecte to update.
     */
    where: CollecteWhereUniqueInput
  }

  /**
   * Collecte updateMany
   */
  export type CollecteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collectes.
     */
    data: XOR<CollecteUpdateManyMutationInput, CollecteUncheckedUpdateManyInput>
    /**
     * Filter which Collectes to update
     */
    where?: CollecteWhereInput
    /**
     * Limit how many Collectes to update.
     */
    limit?: number
  }

  /**
   * Collecte updateManyAndReturn
   */
  export type CollecteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * The data used to update Collectes.
     */
    data: XOR<CollecteUpdateManyMutationInput, CollecteUncheckedUpdateManyInput>
    /**
     * Filter which Collectes to update
     */
    where?: CollecteWhereInput
    /**
     * Limit how many Collectes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Collecte upsert
   */
  export type CollecteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * The filter to search for the Collecte to update in case it exists.
     */
    where: CollecteWhereUniqueInput
    /**
     * In case the Collecte found by the `where` argument doesn't exist, create a new Collecte with this data.
     */
    create: XOR<CollecteCreateInput, CollecteUncheckedCreateInput>
    /**
     * In case the Collecte was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollecteUpdateInput, CollecteUncheckedUpdateInput>
  }

  /**
   * Collecte delete
   */
  export type CollecteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
    /**
     * Filter which Collecte to delete.
     */
    where: CollecteWhereUniqueInput
  }

  /**
   * Collecte deleteMany
   */
  export type CollecteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collectes to delete
     */
    where?: CollecteWhereInput
    /**
     * Limit how many Collectes to delete.
     */
    limit?: number
  }

  /**
   * Collecte.dons
   */
  export type Collecte$donsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    where?: DonWhereInput
    orderBy?: DonOrderByWithRelationInput | DonOrderByWithRelationInput[]
    cursor?: DonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonScalarFieldEnum | DonScalarFieldEnum[]
  }

  /**
   * Collecte.updates
   */
  export type Collecte$updatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    where?: UpdateWhereInput
    orderBy?: UpdateOrderByWithRelationInput | UpdateOrderByWithRelationInput[]
    cursor?: UpdateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UpdateScalarFieldEnum | UpdateScalarFieldEnum[]
  }

  /**
   * Collecte.signalements
   */
  export type Collecte$signalementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    where?: SignalementWhereInput
    orderBy?: SignalementOrderByWithRelationInput | SignalementOrderByWithRelationInput[]
    cursor?: SignalementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignalementScalarFieldEnum | SignalementScalarFieldEnum[]
  }

  /**
   * Collecte.retraits
   */
  export type Collecte$retraitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    where?: RetraitWhereInput
    orderBy?: RetraitOrderByWithRelationInput | RetraitOrderByWithRelationInput[]
    cursor?: RetraitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RetraitScalarFieldEnum | RetraitScalarFieldEnum[]
  }

  /**
   * Collecte without action
   */
  export type CollecteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collecte
     */
    select?: CollecteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collecte
     */
    omit?: CollecteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollecteInclude<ExtArgs> | null
  }


  /**
   * Model Don
   */

  export type AggregateDon = {
    _count: DonCountAggregateOutputType | null
    _avg: DonAvgAggregateOutputType | null
    _sum: DonSumAggregateOutputType | null
    _min: DonMinAggregateOutputType | null
    _max: DonMaxAggregateOutputType | null
  }

  export type DonAvgAggregateOutputType = {
    amountXof: number | null
  }

  export type DonSumAggregateOutputType = {
    amountXof: number | null
  }

  export type DonMinAggregateOutputType = {
    id: string | null
    collecteId: string | null
    amountXof: number | null
    paymentMethod: string | null
    anonymous: boolean | null
    donorName: string | null
    status: $Enums.PaymentStatus | null
    transactionId: string | null
    createdAt: Date | null
  }

  export type DonMaxAggregateOutputType = {
    id: string | null
    collecteId: string | null
    amountXof: number | null
    paymentMethod: string | null
    anonymous: boolean | null
    donorName: string | null
    status: $Enums.PaymentStatus | null
    transactionId: string | null
    createdAt: Date | null
  }

  export type DonCountAggregateOutputType = {
    id: number
    collecteId: number
    amountXof: number
    paymentMethod: number
    anonymous: number
    donorName: number
    status: number
    transactionId: number
    createdAt: number
    _all: number
  }


  export type DonAvgAggregateInputType = {
    amountXof?: true
  }

  export type DonSumAggregateInputType = {
    amountXof?: true
  }

  export type DonMinAggregateInputType = {
    id?: true
    collecteId?: true
    amountXof?: true
    paymentMethod?: true
    anonymous?: true
    donorName?: true
    status?: true
    transactionId?: true
    createdAt?: true
  }

  export type DonMaxAggregateInputType = {
    id?: true
    collecteId?: true
    amountXof?: true
    paymentMethod?: true
    anonymous?: true
    donorName?: true
    status?: true
    transactionId?: true
    createdAt?: true
  }

  export type DonCountAggregateInputType = {
    id?: true
    collecteId?: true
    amountXof?: true
    paymentMethod?: true
    anonymous?: true
    donorName?: true
    status?: true
    transactionId?: true
    createdAt?: true
    _all?: true
  }

  export type DonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Don to aggregate.
     */
    where?: DonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dons to fetch.
     */
    orderBy?: DonOrderByWithRelationInput | DonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dons
    **/
    _count?: true | DonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonMaxAggregateInputType
  }

  export type GetDonAggregateType<T extends DonAggregateArgs> = {
        [P in keyof T & keyof AggregateDon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDon[P]>
      : GetScalarType<T[P], AggregateDon[P]>
  }




  export type DonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonWhereInput
    orderBy?: DonOrderByWithAggregationInput | DonOrderByWithAggregationInput[]
    by: DonScalarFieldEnum[] | DonScalarFieldEnum
    having?: DonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonCountAggregateInputType | true
    _avg?: DonAvgAggregateInputType
    _sum?: DonSumAggregateInputType
    _min?: DonMinAggregateInputType
    _max?: DonMaxAggregateInputType
  }

  export type DonGroupByOutputType = {
    id: string
    collecteId: string
    amountXof: number
    paymentMethod: string
    anonymous: boolean
    donorName: string | null
    status: $Enums.PaymentStatus
    transactionId: string | null
    createdAt: Date
    _count: DonCountAggregateOutputType | null
    _avg: DonAvgAggregateOutputType | null
    _sum: DonSumAggregateOutputType | null
    _min: DonMinAggregateOutputType | null
    _max: DonMaxAggregateOutputType | null
  }

  type GetDonGroupByPayload<T extends DonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonGroupByOutputType[P]>
            : GetScalarType<T[P], DonGroupByOutputType[P]>
        }
      >
    >


  export type DonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    amountXof?: boolean
    paymentMethod?: boolean
    anonymous?: boolean
    donorName?: boolean
    status?: boolean
    transactionId?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["don"]>

  export type DonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    amountXof?: boolean
    paymentMethod?: boolean
    anonymous?: boolean
    donorName?: boolean
    status?: boolean
    transactionId?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["don"]>

  export type DonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    amountXof?: boolean
    paymentMethod?: boolean
    anonymous?: boolean
    donorName?: boolean
    status?: boolean
    transactionId?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["don"]>

  export type DonSelectScalar = {
    id?: boolean
    collecteId?: boolean
    amountXof?: boolean
    paymentMethod?: boolean
    anonymous?: boolean
    donorName?: boolean
    status?: boolean
    transactionId?: boolean
    createdAt?: boolean
  }

  export type DonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "collecteId" | "amountXof" | "paymentMethod" | "anonymous" | "donorName" | "status" | "transactionId" | "createdAt", ExtArgs["result"]["don"]>
  export type DonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }
  export type DonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }
  export type DonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }

  export type $DonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Don"
    objects: {
      collecte: Prisma.$CollectePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      collecteId: string
      amountXof: number
      paymentMethod: string
      anonymous: boolean
      donorName: string | null
      status: $Enums.PaymentStatus
      transactionId: string | null
      createdAt: Date
    }, ExtArgs["result"]["don"]>
    composites: {}
  }

  type DonGetPayload<S extends boolean | null | undefined | DonDefaultArgs> = $Result.GetResult<Prisma.$DonPayload, S>

  type DonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonCountAggregateInputType | true
    }

  export interface DonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Don'], meta: { name: 'Don' } }
    /**
     * Find zero or one Don that matches the filter.
     * @param {DonFindUniqueArgs} args - Arguments to find a Don
     * @example
     * // Get one Don
     * const don = await prisma.don.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonFindUniqueArgs>(args: SelectSubset<T, DonFindUniqueArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Don that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonFindUniqueOrThrowArgs} args - Arguments to find a Don
     * @example
     * // Get one Don
     * const don = await prisma.don.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonFindUniqueOrThrowArgs>(args: SelectSubset<T, DonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Don that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonFindFirstArgs} args - Arguments to find a Don
     * @example
     * // Get one Don
     * const don = await prisma.don.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonFindFirstArgs>(args?: SelectSubset<T, DonFindFirstArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Don that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonFindFirstOrThrowArgs} args - Arguments to find a Don
     * @example
     * // Get one Don
     * const don = await prisma.don.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonFindFirstOrThrowArgs>(args?: SelectSubset<T, DonFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dons
     * const dons = await prisma.don.findMany()
     * 
     * // Get first 10 Dons
     * const dons = await prisma.don.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const donWithIdOnly = await prisma.don.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DonFindManyArgs>(args?: SelectSubset<T, DonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Don.
     * @param {DonCreateArgs} args - Arguments to create a Don.
     * @example
     * // Create one Don
     * const Don = await prisma.don.create({
     *   data: {
     *     // ... data to create a Don
     *   }
     * })
     * 
     */
    create<T extends DonCreateArgs>(args: SelectSubset<T, DonCreateArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dons.
     * @param {DonCreateManyArgs} args - Arguments to create many Dons.
     * @example
     * // Create many Dons
     * const don = await prisma.don.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonCreateManyArgs>(args?: SelectSubset<T, DonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dons and returns the data saved in the database.
     * @param {DonCreateManyAndReturnArgs} args - Arguments to create many Dons.
     * @example
     * // Create many Dons
     * const don = await prisma.don.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dons and only return the `id`
     * const donWithIdOnly = await prisma.don.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonCreateManyAndReturnArgs>(args?: SelectSubset<T, DonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Don.
     * @param {DonDeleteArgs} args - Arguments to delete one Don.
     * @example
     * // Delete one Don
     * const Don = await prisma.don.delete({
     *   where: {
     *     // ... filter to delete one Don
     *   }
     * })
     * 
     */
    delete<T extends DonDeleteArgs>(args: SelectSubset<T, DonDeleteArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Don.
     * @param {DonUpdateArgs} args - Arguments to update one Don.
     * @example
     * // Update one Don
     * const don = await prisma.don.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonUpdateArgs>(args: SelectSubset<T, DonUpdateArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dons.
     * @param {DonDeleteManyArgs} args - Arguments to filter Dons to delete.
     * @example
     * // Delete a few Dons
     * const { count } = await prisma.don.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonDeleteManyArgs>(args?: SelectSubset<T, DonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dons
     * const don = await prisma.don.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonUpdateManyArgs>(args: SelectSubset<T, DonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dons and returns the data updated in the database.
     * @param {DonUpdateManyAndReturnArgs} args - Arguments to update many Dons.
     * @example
     * // Update many Dons
     * const don = await prisma.don.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dons and only return the `id`
     * const donWithIdOnly = await prisma.don.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DonUpdateManyAndReturnArgs>(args: SelectSubset<T, DonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Don.
     * @param {DonUpsertArgs} args - Arguments to update or create a Don.
     * @example
     * // Update or create a Don
     * const don = await prisma.don.upsert({
     *   create: {
     *     // ... data to create a Don
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Don we want to update
     *   }
     * })
     */
    upsert<T extends DonUpsertArgs>(args: SelectSubset<T, DonUpsertArgs<ExtArgs>>): Prisma__DonClient<$Result.GetResult<Prisma.$DonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonCountArgs} args - Arguments to filter Dons to count.
     * @example
     * // Count the number of Dons
     * const count = await prisma.don.count({
     *   where: {
     *     // ... the filter for the Dons we want to count
     *   }
     * })
    **/
    count<T extends DonCountArgs>(
      args?: Subset<T, DonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Don.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DonAggregateArgs>(args: Subset<T, DonAggregateArgs>): Prisma.PrismaPromise<GetDonAggregateType<T>>

    /**
     * Group by Don.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonGroupByArgs['orderBy'] }
        : { orderBy?: DonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Don model
   */
  readonly fields: DonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Don.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collecte<T extends CollecteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollecteDefaultArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Don model
   */
  interface DonFieldRefs {
    readonly id: FieldRef<"Don", 'String'>
    readonly collecteId: FieldRef<"Don", 'String'>
    readonly amountXof: FieldRef<"Don", 'Int'>
    readonly paymentMethod: FieldRef<"Don", 'String'>
    readonly anonymous: FieldRef<"Don", 'Boolean'>
    readonly donorName: FieldRef<"Don", 'String'>
    readonly status: FieldRef<"Don", 'PaymentStatus'>
    readonly transactionId: FieldRef<"Don", 'String'>
    readonly createdAt: FieldRef<"Don", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Don findUnique
   */
  export type DonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * Filter, which Don to fetch.
     */
    where: DonWhereUniqueInput
  }

  /**
   * Don findUniqueOrThrow
   */
  export type DonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * Filter, which Don to fetch.
     */
    where: DonWhereUniqueInput
  }

  /**
   * Don findFirst
   */
  export type DonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * Filter, which Don to fetch.
     */
    where?: DonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dons to fetch.
     */
    orderBy?: DonOrderByWithRelationInput | DonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dons.
     */
    cursor?: DonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dons.
     */
    distinct?: DonScalarFieldEnum | DonScalarFieldEnum[]
  }

  /**
   * Don findFirstOrThrow
   */
  export type DonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * Filter, which Don to fetch.
     */
    where?: DonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dons to fetch.
     */
    orderBy?: DonOrderByWithRelationInput | DonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dons.
     */
    cursor?: DonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dons.
     */
    distinct?: DonScalarFieldEnum | DonScalarFieldEnum[]
  }

  /**
   * Don findMany
   */
  export type DonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * Filter, which Dons to fetch.
     */
    where?: DonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dons to fetch.
     */
    orderBy?: DonOrderByWithRelationInput | DonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dons.
     */
    cursor?: DonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dons.
     */
    distinct?: DonScalarFieldEnum | DonScalarFieldEnum[]
  }

  /**
   * Don create
   */
  export type DonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * The data needed to create a Don.
     */
    data: XOR<DonCreateInput, DonUncheckedCreateInput>
  }

  /**
   * Don createMany
   */
  export type DonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dons.
     */
    data: DonCreateManyInput | DonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Don createManyAndReturn
   */
  export type DonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * The data used to create many Dons.
     */
    data: DonCreateManyInput | DonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Don update
   */
  export type DonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * The data needed to update a Don.
     */
    data: XOR<DonUpdateInput, DonUncheckedUpdateInput>
    /**
     * Choose, which Don to update.
     */
    where: DonWhereUniqueInput
  }

  /**
   * Don updateMany
   */
  export type DonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dons.
     */
    data: XOR<DonUpdateManyMutationInput, DonUncheckedUpdateManyInput>
    /**
     * Filter which Dons to update
     */
    where?: DonWhereInput
    /**
     * Limit how many Dons to update.
     */
    limit?: number
  }

  /**
   * Don updateManyAndReturn
   */
  export type DonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * The data used to update Dons.
     */
    data: XOR<DonUpdateManyMutationInput, DonUncheckedUpdateManyInput>
    /**
     * Filter which Dons to update
     */
    where?: DonWhereInput
    /**
     * Limit how many Dons to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Don upsert
   */
  export type DonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * The filter to search for the Don to update in case it exists.
     */
    where: DonWhereUniqueInput
    /**
     * In case the Don found by the `where` argument doesn't exist, create a new Don with this data.
     */
    create: XOR<DonCreateInput, DonUncheckedCreateInput>
    /**
     * In case the Don was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonUpdateInput, DonUncheckedUpdateInput>
  }

  /**
   * Don delete
   */
  export type DonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
    /**
     * Filter which Don to delete.
     */
    where: DonWhereUniqueInput
  }

  /**
   * Don deleteMany
   */
  export type DonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dons to delete
     */
    where?: DonWhereInput
    /**
     * Limit how many Dons to delete.
     */
    limit?: number
  }

  /**
   * Don without action
   */
  export type DonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Don
     */
    select?: DonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Don
     */
    omit?: DonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonInclude<ExtArgs> | null
  }


  /**
   * Model Retrait
   */

  export type AggregateRetrait = {
    _count: RetraitCountAggregateOutputType | null
    _avg: RetraitAvgAggregateOutputType | null
    _sum: RetraitSumAggregateOutputType | null
    _min: RetraitMinAggregateOutputType | null
    _max: RetraitMaxAggregateOutputType | null
  }

  export type RetraitAvgAggregateOutputType = {
    amountXof: number | null
  }

  export type RetraitSumAggregateOutputType = {
    amountXof: number | null
  }

  export type RetraitMinAggregateOutputType = {
    id: string | null
    collecteId: string | null
    userId: string | null
    amountXof: number | null
    method: string | null
    status: $Enums.WithdrawalStatus | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type RetraitMaxAggregateOutputType = {
    id: string | null
    collecteId: string | null
    userId: string | null
    amountXof: number | null
    method: string | null
    status: $Enums.WithdrawalStatus | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type RetraitCountAggregateOutputType = {
    id: number
    collecteId: number
    userId: number
    amountXof: number
    method: number
    status: number
    processedAt: number
    createdAt: number
    _all: number
  }


  export type RetraitAvgAggregateInputType = {
    amountXof?: true
  }

  export type RetraitSumAggregateInputType = {
    amountXof?: true
  }

  export type RetraitMinAggregateInputType = {
    id?: true
    collecteId?: true
    userId?: true
    amountXof?: true
    method?: true
    status?: true
    processedAt?: true
    createdAt?: true
  }

  export type RetraitMaxAggregateInputType = {
    id?: true
    collecteId?: true
    userId?: true
    amountXof?: true
    method?: true
    status?: true
    processedAt?: true
    createdAt?: true
  }

  export type RetraitCountAggregateInputType = {
    id?: true
    collecteId?: true
    userId?: true
    amountXof?: true
    method?: true
    status?: true
    processedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RetraitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Retrait to aggregate.
     */
    where?: RetraitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retraits to fetch.
     */
    orderBy?: RetraitOrderByWithRelationInput | RetraitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RetraitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retraits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retraits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Retraits
    **/
    _count?: true | RetraitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RetraitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RetraitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RetraitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RetraitMaxAggregateInputType
  }

  export type GetRetraitAggregateType<T extends RetraitAggregateArgs> = {
        [P in keyof T & keyof AggregateRetrait]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRetrait[P]>
      : GetScalarType<T[P], AggregateRetrait[P]>
  }




  export type RetraitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetraitWhereInput
    orderBy?: RetraitOrderByWithAggregationInput | RetraitOrderByWithAggregationInput[]
    by: RetraitScalarFieldEnum[] | RetraitScalarFieldEnum
    having?: RetraitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RetraitCountAggregateInputType | true
    _avg?: RetraitAvgAggregateInputType
    _sum?: RetraitSumAggregateInputType
    _min?: RetraitMinAggregateInputType
    _max?: RetraitMaxAggregateInputType
  }

  export type RetraitGroupByOutputType = {
    id: string
    collecteId: string
    userId: string
    amountXof: number
    method: string
    status: $Enums.WithdrawalStatus
    processedAt: Date | null
    createdAt: Date
    _count: RetraitCountAggregateOutputType | null
    _avg: RetraitAvgAggregateOutputType | null
    _sum: RetraitSumAggregateOutputType | null
    _min: RetraitMinAggregateOutputType | null
    _max: RetraitMaxAggregateOutputType | null
  }

  type GetRetraitGroupByPayload<T extends RetraitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RetraitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RetraitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RetraitGroupByOutputType[P]>
            : GetScalarType<T[P], RetraitGroupByOutputType[P]>
        }
      >
    >


  export type RetraitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    userId?: boolean
    amountXof?: boolean
    method?: boolean
    status?: boolean
    processedAt?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retrait"]>

  export type RetraitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    userId?: boolean
    amountXof?: boolean
    method?: boolean
    status?: boolean
    processedAt?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retrait"]>

  export type RetraitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    userId?: boolean
    amountXof?: boolean
    method?: boolean
    status?: boolean
    processedAt?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retrait"]>

  export type RetraitSelectScalar = {
    id?: boolean
    collecteId?: boolean
    userId?: boolean
    amountXof?: boolean
    method?: boolean
    status?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }

  export type RetraitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "collecteId" | "userId" | "amountXof" | "method" | "status" | "processedAt" | "createdAt", ExtArgs["result"]["retrait"]>
  export type RetraitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RetraitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RetraitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RetraitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Retrait"
    objects: {
      collecte: Prisma.$CollectePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      collecteId: string
      userId: string
      amountXof: number
      method: string
      status: $Enums.WithdrawalStatus
      processedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["retrait"]>
    composites: {}
  }

  type RetraitGetPayload<S extends boolean | null | undefined | RetraitDefaultArgs> = $Result.GetResult<Prisma.$RetraitPayload, S>

  type RetraitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RetraitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RetraitCountAggregateInputType | true
    }

  export interface RetraitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Retrait'], meta: { name: 'Retrait' } }
    /**
     * Find zero or one Retrait that matches the filter.
     * @param {RetraitFindUniqueArgs} args - Arguments to find a Retrait
     * @example
     * // Get one Retrait
     * const retrait = await prisma.retrait.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RetraitFindUniqueArgs>(args: SelectSubset<T, RetraitFindUniqueArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Retrait that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RetraitFindUniqueOrThrowArgs} args - Arguments to find a Retrait
     * @example
     * // Get one Retrait
     * const retrait = await prisma.retrait.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RetraitFindUniqueOrThrowArgs>(args: SelectSubset<T, RetraitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Retrait that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitFindFirstArgs} args - Arguments to find a Retrait
     * @example
     * // Get one Retrait
     * const retrait = await prisma.retrait.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RetraitFindFirstArgs>(args?: SelectSubset<T, RetraitFindFirstArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Retrait that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitFindFirstOrThrowArgs} args - Arguments to find a Retrait
     * @example
     * // Get one Retrait
     * const retrait = await prisma.retrait.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RetraitFindFirstOrThrowArgs>(args?: SelectSubset<T, RetraitFindFirstOrThrowArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Retraits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Retraits
     * const retraits = await prisma.retrait.findMany()
     * 
     * // Get first 10 Retraits
     * const retraits = await prisma.retrait.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const retraitWithIdOnly = await prisma.retrait.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RetraitFindManyArgs>(args?: SelectSubset<T, RetraitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Retrait.
     * @param {RetraitCreateArgs} args - Arguments to create a Retrait.
     * @example
     * // Create one Retrait
     * const Retrait = await prisma.retrait.create({
     *   data: {
     *     // ... data to create a Retrait
     *   }
     * })
     * 
     */
    create<T extends RetraitCreateArgs>(args: SelectSubset<T, RetraitCreateArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Retraits.
     * @param {RetraitCreateManyArgs} args - Arguments to create many Retraits.
     * @example
     * // Create many Retraits
     * const retrait = await prisma.retrait.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RetraitCreateManyArgs>(args?: SelectSubset<T, RetraitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Retraits and returns the data saved in the database.
     * @param {RetraitCreateManyAndReturnArgs} args - Arguments to create many Retraits.
     * @example
     * // Create many Retraits
     * const retrait = await prisma.retrait.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Retraits and only return the `id`
     * const retraitWithIdOnly = await prisma.retrait.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RetraitCreateManyAndReturnArgs>(args?: SelectSubset<T, RetraitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Retrait.
     * @param {RetraitDeleteArgs} args - Arguments to delete one Retrait.
     * @example
     * // Delete one Retrait
     * const Retrait = await prisma.retrait.delete({
     *   where: {
     *     // ... filter to delete one Retrait
     *   }
     * })
     * 
     */
    delete<T extends RetraitDeleteArgs>(args: SelectSubset<T, RetraitDeleteArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Retrait.
     * @param {RetraitUpdateArgs} args - Arguments to update one Retrait.
     * @example
     * // Update one Retrait
     * const retrait = await prisma.retrait.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RetraitUpdateArgs>(args: SelectSubset<T, RetraitUpdateArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Retraits.
     * @param {RetraitDeleteManyArgs} args - Arguments to filter Retraits to delete.
     * @example
     * // Delete a few Retraits
     * const { count } = await prisma.retrait.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RetraitDeleteManyArgs>(args?: SelectSubset<T, RetraitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Retraits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Retraits
     * const retrait = await prisma.retrait.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RetraitUpdateManyArgs>(args: SelectSubset<T, RetraitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Retraits and returns the data updated in the database.
     * @param {RetraitUpdateManyAndReturnArgs} args - Arguments to update many Retraits.
     * @example
     * // Update many Retraits
     * const retrait = await prisma.retrait.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Retraits and only return the `id`
     * const retraitWithIdOnly = await prisma.retrait.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RetraitUpdateManyAndReturnArgs>(args: SelectSubset<T, RetraitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Retrait.
     * @param {RetraitUpsertArgs} args - Arguments to update or create a Retrait.
     * @example
     * // Update or create a Retrait
     * const retrait = await prisma.retrait.upsert({
     *   create: {
     *     // ... data to create a Retrait
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Retrait we want to update
     *   }
     * })
     */
    upsert<T extends RetraitUpsertArgs>(args: SelectSubset<T, RetraitUpsertArgs<ExtArgs>>): Prisma__RetraitClient<$Result.GetResult<Prisma.$RetraitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Retraits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitCountArgs} args - Arguments to filter Retraits to count.
     * @example
     * // Count the number of Retraits
     * const count = await prisma.retrait.count({
     *   where: {
     *     // ... the filter for the Retraits we want to count
     *   }
     * })
    **/
    count<T extends RetraitCountArgs>(
      args?: Subset<T, RetraitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RetraitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Retrait.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RetraitAggregateArgs>(args: Subset<T, RetraitAggregateArgs>): Prisma.PrismaPromise<GetRetraitAggregateType<T>>

    /**
     * Group by Retrait.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetraitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RetraitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RetraitGroupByArgs['orderBy'] }
        : { orderBy?: RetraitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RetraitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRetraitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Retrait model
   */
  readonly fields: RetraitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Retrait.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RetraitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collecte<T extends CollecteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollecteDefaultArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Retrait model
   */
  interface RetraitFieldRefs {
    readonly id: FieldRef<"Retrait", 'String'>
    readonly collecteId: FieldRef<"Retrait", 'String'>
    readonly userId: FieldRef<"Retrait", 'String'>
    readonly amountXof: FieldRef<"Retrait", 'Int'>
    readonly method: FieldRef<"Retrait", 'String'>
    readonly status: FieldRef<"Retrait", 'WithdrawalStatus'>
    readonly processedAt: FieldRef<"Retrait", 'DateTime'>
    readonly createdAt: FieldRef<"Retrait", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Retrait findUnique
   */
  export type RetraitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * Filter, which Retrait to fetch.
     */
    where: RetraitWhereUniqueInput
  }

  /**
   * Retrait findUniqueOrThrow
   */
  export type RetraitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * Filter, which Retrait to fetch.
     */
    where: RetraitWhereUniqueInput
  }

  /**
   * Retrait findFirst
   */
  export type RetraitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * Filter, which Retrait to fetch.
     */
    where?: RetraitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retraits to fetch.
     */
    orderBy?: RetraitOrderByWithRelationInput | RetraitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Retraits.
     */
    cursor?: RetraitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retraits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retraits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retraits.
     */
    distinct?: RetraitScalarFieldEnum | RetraitScalarFieldEnum[]
  }

  /**
   * Retrait findFirstOrThrow
   */
  export type RetraitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * Filter, which Retrait to fetch.
     */
    where?: RetraitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retraits to fetch.
     */
    orderBy?: RetraitOrderByWithRelationInput | RetraitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Retraits.
     */
    cursor?: RetraitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retraits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retraits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retraits.
     */
    distinct?: RetraitScalarFieldEnum | RetraitScalarFieldEnum[]
  }

  /**
   * Retrait findMany
   */
  export type RetraitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * Filter, which Retraits to fetch.
     */
    where?: RetraitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retraits to fetch.
     */
    orderBy?: RetraitOrderByWithRelationInput | RetraitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Retraits.
     */
    cursor?: RetraitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retraits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retraits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retraits.
     */
    distinct?: RetraitScalarFieldEnum | RetraitScalarFieldEnum[]
  }

  /**
   * Retrait create
   */
  export type RetraitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * The data needed to create a Retrait.
     */
    data: XOR<RetraitCreateInput, RetraitUncheckedCreateInput>
  }

  /**
   * Retrait createMany
   */
  export type RetraitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Retraits.
     */
    data: RetraitCreateManyInput | RetraitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Retrait createManyAndReturn
   */
  export type RetraitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * The data used to create many Retraits.
     */
    data: RetraitCreateManyInput | RetraitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Retrait update
   */
  export type RetraitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * The data needed to update a Retrait.
     */
    data: XOR<RetraitUpdateInput, RetraitUncheckedUpdateInput>
    /**
     * Choose, which Retrait to update.
     */
    where: RetraitWhereUniqueInput
  }

  /**
   * Retrait updateMany
   */
  export type RetraitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Retraits.
     */
    data: XOR<RetraitUpdateManyMutationInput, RetraitUncheckedUpdateManyInput>
    /**
     * Filter which Retraits to update
     */
    where?: RetraitWhereInput
    /**
     * Limit how many Retraits to update.
     */
    limit?: number
  }

  /**
   * Retrait updateManyAndReturn
   */
  export type RetraitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * The data used to update Retraits.
     */
    data: XOR<RetraitUpdateManyMutationInput, RetraitUncheckedUpdateManyInput>
    /**
     * Filter which Retraits to update
     */
    where?: RetraitWhereInput
    /**
     * Limit how many Retraits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Retrait upsert
   */
  export type RetraitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * The filter to search for the Retrait to update in case it exists.
     */
    where: RetraitWhereUniqueInput
    /**
     * In case the Retrait found by the `where` argument doesn't exist, create a new Retrait with this data.
     */
    create: XOR<RetraitCreateInput, RetraitUncheckedCreateInput>
    /**
     * In case the Retrait was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RetraitUpdateInput, RetraitUncheckedUpdateInput>
  }

  /**
   * Retrait delete
   */
  export type RetraitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
    /**
     * Filter which Retrait to delete.
     */
    where: RetraitWhereUniqueInput
  }

  /**
   * Retrait deleteMany
   */
  export type RetraitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Retraits to delete
     */
    where?: RetraitWhereInput
    /**
     * Limit how many Retraits to delete.
     */
    limit?: number
  }

  /**
   * Retrait without action
   */
  export type RetraitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retrait
     */
    select?: RetraitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retrait
     */
    omit?: RetraitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetraitInclude<ExtArgs> | null
  }


  /**
   * Model Update
   */

  export type AggregateUpdate = {
    _count: UpdateCountAggregateOutputType | null
    _min: UpdateMinAggregateOutputType | null
    _max: UpdateMaxAggregateOutputType | null
  }

  export type UpdateMinAggregateOutputType = {
    id: string | null
    collecteId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type UpdateMaxAggregateOutputType = {
    id: string | null
    collecteId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type UpdateCountAggregateOutputType = {
    id: number
    collecteId: number
    content: number
    createdAt: number
    _all: number
  }


  export type UpdateMinAggregateInputType = {
    id?: true
    collecteId?: true
    content?: true
    createdAt?: true
  }

  export type UpdateMaxAggregateInputType = {
    id?: true
    collecteId?: true
    content?: true
    createdAt?: true
  }

  export type UpdateCountAggregateInputType = {
    id?: true
    collecteId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type UpdateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Update to aggregate.
     */
    where?: UpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Updates to fetch.
     */
    orderBy?: UpdateOrderByWithRelationInput | UpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Updates
    **/
    _count?: true | UpdateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UpdateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UpdateMaxAggregateInputType
  }

  export type GetUpdateAggregateType<T extends UpdateAggregateArgs> = {
        [P in keyof T & keyof AggregateUpdate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUpdate[P]>
      : GetScalarType<T[P], AggregateUpdate[P]>
  }




  export type UpdateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpdateWhereInput
    orderBy?: UpdateOrderByWithAggregationInput | UpdateOrderByWithAggregationInput[]
    by: UpdateScalarFieldEnum[] | UpdateScalarFieldEnum
    having?: UpdateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UpdateCountAggregateInputType | true
    _min?: UpdateMinAggregateInputType
    _max?: UpdateMaxAggregateInputType
  }

  export type UpdateGroupByOutputType = {
    id: string
    collecteId: string
    content: string
    createdAt: Date
    _count: UpdateCountAggregateOutputType | null
    _min: UpdateMinAggregateOutputType | null
    _max: UpdateMaxAggregateOutputType | null
  }

  type GetUpdateGroupByPayload<T extends UpdateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UpdateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UpdateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UpdateGroupByOutputType[P]>
            : GetScalarType<T[P], UpdateGroupByOutputType[P]>
        }
      >
    >


  export type UpdateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    content?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["update"]>

  export type UpdateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    content?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["update"]>

  export type UpdateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    content?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["update"]>

  export type UpdateSelectScalar = {
    id?: boolean
    collecteId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type UpdateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "collecteId" | "content" | "createdAt", ExtArgs["result"]["update"]>
  export type UpdateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }
  export type UpdateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }
  export type UpdateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }

  export type $UpdatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Update"
    objects: {
      collecte: Prisma.$CollectePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      collecteId: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["update"]>
    composites: {}
  }

  type UpdateGetPayload<S extends boolean | null | undefined | UpdateDefaultArgs> = $Result.GetResult<Prisma.$UpdatePayload, S>

  type UpdateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UpdateCountAggregateInputType | true
    }

  export interface UpdateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Update'], meta: { name: 'Update' } }
    /**
     * Find zero or one Update that matches the filter.
     * @param {UpdateFindUniqueArgs} args - Arguments to find a Update
     * @example
     * // Get one Update
     * const update = await prisma.update.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UpdateFindUniqueArgs>(args: SelectSubset<T, UpdateFindUniqueArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Update that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UpdateFindUniqueOrThrowArgs} args - Arguments to find a Update
     * @example
     * // Get one Update
     * const update = await prisma.update.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UpdateFindUniqueOrThrowArgs>(args: SelectSubset<T, UpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Update that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateFindFirstArgs} args - Arguments to find a Update
     * @example
     * // Get one Update
     * const update = await prisma.update.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UpdateFindFirstArgs>(args?: SelectSubset<T, UpdateFindFirstArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Update that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateFindFirstOrThrowArgs} args - Arguments to find a Update
     * @example
     * // Get one Update
     * const update = await prisma.update.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UpdateFindFirstOrThrowArgs>(args?: SelectSubset<T, UpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Updates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Updates
     * const updates = await prisma.update.findMany()
     * 
     * // Get first 10 Updates
     * const updates = await prisma.update.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const updateWithIdOnly = await prisma.update.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UpdateFindManyArgs>(args?: SelectSubset<T, UpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Update.
     * @param {UpdateCreateArgs} args - Arguments to create a Update.
     * @example
     * // Create one Update
     * const Update = await prisma.update.create({
     *   data: {
     *     // ... data to create a Update
     *   }
     * })
     * 
     */
    create<T extends UpdateCreateArgs>(args: SelectSubset<T, UpdateCreateArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Updates.
     * @param {UpdateCreateManyArgs} args - Arguments to create many Updates.
     * @example
     * // Create many Updates
     * const update = await prisma.update.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UpdateCreateManyArgs>(args?: SelectSubset<T, UpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Updates and returns the data saved in the database.
     * @param {UpdateCreateManyAndReturnArgs} args - Arguments to create many Updates.
     * @example
     * // Create many Updates
     * const update = await prisma.update.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Updates and only return the `id`
     * const updateWithIdOnly = await prisma.update.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UpdateCreateManyAndReturnArgs>(args?: SelectSubset<T, UpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Update.
     * @param {UpdateDeleteArgs} args - Arguments to delete one Update.
     * @example
     * // Delete one Update
     * const Update = await prisma.update.delete({
     *   where: {
     *     // ... filter to delete one Update
     *   }
     * })
     * 
     */
    delete<T extends UpdateDeleteArgs>(args: SelectSubset<T, UpdateDeleteArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Update.
     * @param {UpdateUpdateArgs} args - Arguments to update one Update.
     * @example
     * // Update one Update
     * const update = await prisma.update.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UpdateUpdateArgs>(args: SelectSubset<T, UpdateUpdateArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Updates.
     * @param {UpdateDeleteManyArgs} args - Arguments to filter Updates to delete.
     * @example
     * // Delete a few Updates
     * const { count } = await prisma.update.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UpdateDeleteManyArgs>(args?: SelectSubset<T, UpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Updates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Updates
     * const update = await prisma.update.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UpdateUpdateManyArgs>(args: SelectSubset<T, UpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Updates and returns the data updated in the database.
     * @param {UpdateUpdateManyAndReturnArgs} args - Arguments to update many Updates.
     * @example
     * // Update many Updates
     * const update = await prisma.update.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Updates and only return the `id`
     * const updateWithIdOnly = await prisma.update.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UpdateUpdateManyAndReturnArgs>(args: SelectSubset<T, UpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Update.
     * @param {UpdateUpsertArgs} args - Arguments to update or create a Update.
     * @example
     * // Update or create a Update
     * const update = await prisma.update.upsert({
     *   create: {
     *     // ... data to create a Update
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Update we want to update
     *   }
     * })
     */
    upsert<T extends UpdateUpsertArgs>(args: SelectSubset<T, UpdateUpsertArgs<ExtArgs>>): Prisma__UpdateClient<$Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Updates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateCountArgs} args - Arguments to filter Updates to count.
     * @example
     * // Count the number of Updates
     * const count = await prisma.update.count({
     *   where: {
     *     // ... the filter for the Updates we want to count
     *   }
     * })
    **/
    count<T extends UpdateCountArgs>(
      args?: Subset<T, UpdateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UpdateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Update.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UpdateAggregateArgs>(args: Subset<T, UpdateAggregateArgs>): Prisma.PrismaPromise<GetUpdateAggregateType<T>>

    /**
     * Group by Update.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UpdateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UpdateGroupByArgs['orderBy'] }
        : { orderBy?: UpdateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Update model
   */
  readonly fields: UpdateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Update.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UpdateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collecte<T extends CollecteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollecteDefaultArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Update model
   */
  interface UpdateFieldRefs {
    readonly id: FieldRef<"Update", 'String'>
    readonly collecteId: FieldRef<"Update", 'String'>
    readonly content: FieldRef<"Update", 'String'>
    readonly createdAt: FieldRef<"Update", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Update findUnique
   */
  export type UpdateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * Filter, which Update to fetch.
     */
    where: UpdateWhereUniqueInput
  }

  /**
   * Update findUniqueOrThrow
   */
  export type UpdateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * Filter, which Update to fetch.
     */
    where: UpdateWhereUniqueInput
  }

  /**
   * Update findFirst
   */
  export type UpdateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * Filter, which Update to fetch.
     */
    where?: UpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Updates to fetch.
     */
    orderBy?: UpdateOrderByWithRelationInput | UpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Updates.
     */
    cursor?: UpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Updates.
     */
    distinct?: UpdateScalarFieldEnum | UpdateScalarFieldEnum[]
  }

  /**
   * Update findFirstOrThrow
   */
  export type UpdateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * Filter, which Update to fetch.
     */
    where?: UpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Updates to fetch.
     */
    orderBy?: UpdateOrderByWithRelationInput | UpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Updates.
     */
    cursor?: UpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Updates.
     */
    distinct?: UpdateScalarFieldEnum | UpdateScalarFieldEnum[]
  }

  /**
   * Update findMany
   */
  export type UpdateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * Filter, which Updates to fetch.
     */
    where?: UpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Updates to fetch.
     */
    orderBy?: UpdateOrderByWithRelationInput | UpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Updates.
     */
    cursor?: UpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Updates.
     */
    distinct?: UpdateScalarFieldEnum | UpdateScalarFieldEnum[]
  }

  /**
   * Update create
   */
  export type UpdateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * The data needed to create a Update.
     */
    data: XOR<UpdateCreateInput, UpdateUncheckedCreateInput>
  }

  /**
   * Update createMany
   */
  export type UpdateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Updates.
     */
    data: UpdateCreateManyInput | UpdateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Update createManyAndReturn
   */
  export type UpdateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * The data used to create many Updates.
     */
    data: UpdateCreateManyInput | UpdateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Update update
   */
  export type UpdateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * The data needed to update a Update.
     */
    data: XOR<UpdateUpdateInput, UpdateUncheckedUpdateInput>
    /**
     * Choose, which Update to update.
     */
    where: UpdateWhereUniqueInput
  }

  /**
   * Update updateMany
   */
  export type UpdateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Updates.
     */
    data: XOR<UpdateUpdateManyMutationInput, UpdateUncheckedUpdateManyInput>
    /**
     * Filter which Updates to update
     */
    where?: UpdateWhereInput
    /**
     * Limit how many Updates to update.
     */
    limit?: number
  }

  /**
   * Update updateManyAndReturn
   */
  export type UpdateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * The data used to update Updates.
     */
    data: XOR<UpdateUpdateManyMutationInput, UpdateUncheckedUpdateManyInput>
    /**
     * Filter which Updates to update
     */
    where?: UpdateWhereInput
    /**
     * Limit how many Updates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Update upsert
   */
  export type UpdateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * The filter to search for the Update to update in case it exists.
     */
    where: UpdateWhereUniqueInput
    /**
     * In case the Update found by the `where` argument doesn't exist, create a new Update with this data.
     */
    create: XOR<UpdateCreateInput, UpdateUncheckedCreateInput>
    /**
     * In case the Update was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UpdateUpdateInput, UpdateUncheckedUpdateInput>
  }

  /**
   * Update delete
   */
  export type UpdateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
    /**
     * Filter which Update to delete.
     */
    where: UpdateWhereUniqueInput
  }

  /**
   * Update deleteMany
   */
  export type UpdateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Updates to delete
     */
    where?: UpdateWhereInput
    /**
     * Limit how many Updates to delete.
     */
    limit?: number
  }

  /**
   * Update without action
   */
  export type UpdateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Update
     */
    select?: UpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Update
     */
    omit?: UpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpdateInclude<ExtArgs> | null
  }


  /**
   * Model Signalement
   */

  export type AggregateSignalement = {
    _count: SignalementCountAggregateOutputType | null
    _min: SignalementMinAggregateOutputType | null
    _max: SignalementMaxAggregateOutputType | null
  }

  export type SignalementMinAggregateOutputType = {
    id: string | null
    collecteId: string | null
    reason: string | null
    status: string | null
    createdAt: Date | null
  }

  export type SignalementMaxAggregateOutputType = {
    id: string | null
    collecteId: string | null
    reason: string | null
    status: string | null
    createdAt: Date | null
  }

  export type SignalementCountAggregateOutputType = {
    id: number
    collecteId: number
    reason: number
    status: number
    createdAt: number
    _all: number
  }


  export type SignalementMinAggregateInputType = {
    id?: true
    collecteId?: true
    reason?: true
    status?: true
    createdAt?: true
  }

  export type SignalementMaxAggregateInputType = {
    id?: true
    collecteId?: true
    reason?: true
    status?: true
    createdAt?: true
  }

  export type SignalementCountAggregateInputType = {
    id?: true
    collecteId?: true
    reason?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type SignalementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signalement to aggregate.
     */
    where?: SignalementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signalements to fetch.
     */
    orderBy?: SignalementOrderByWithRelationInput | SignalementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignalementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signalements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signalements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Signalements
    **/
    _count?: true | SignalementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignalementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignalementMaxAggregateInputType
  }

  export type GetSignalementAggregateType<T extends SignalementAggregateArgs> = {
        [P in keyof T & keyof AggregateSignalement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignalement[P]>
      : GetScalarType<T[P], AggregateSignalement[P]>
  }




  export type SignalementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalementWhereInput
    orderBy?: SignalementOrderByWithAggregationInput | SignalementOrderByWithAggregationInput[]
    by: SignalementScalarFieldEnum[] | SignalementScalarFieldEnum
    having?: SignalementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignalementCountAggregateInputType | true
    _min?: SignalementMinAggregateInputType
    _max?: SignalementMaxAggregateInputType
  }

  export type SignalementGroupByOutputType = {
    id: string
    collecteId: string
    reason: string
    status: string
    createdAt: Date
    _count: SignalementCountAggregateOutputType | null
    _min: SignalementMinAggregateOutputType | null
    _max: SignalementMaxAggregateOutputType | null
  }

  type GetSignalementGroupByPayload<T extends SignalementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignalementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignalementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignalementGroupByOutputType[P]>
            : GetScalarType<T[P], SignalementGroupByOutputType[P]>
        }
      >
    >


  export type SignalementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signalement"]>

  export type SignalementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signalement"]>

  export type SignalementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collecteId?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signalement"]>

  export type SignalementSelectScalar = {
    id?: boolean
    collecteId?: boolean
    reason?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type SignalementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "collecteId" | "reason" | "status" | "createdAt", ExtArgs["result"]["signalement"]>
  export type SignalementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }
  export type SignalementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }
  export type SignalementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collecte?: boolean | CollecteDefaultArgs<ExtArgs>
  }

  export type $SignalementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Signalement"
    objects: {
      collecte: Prisma.$CollectePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      collecteId: string
      reason: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["signalement"]>
    composites: {}
  }

  type SignalementGetPayload<S extends boolean | null | undefined | SignalementDefaultArgs> = $Result.GetResult<Prisma.$SignalementPayload, S>

  type SignalementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SignalementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SignalementCountAggregateInputType | true
    }

  export interface SignalementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Signalement'], meta: { name: 'Signalement' } }
    /**
     * Find zero or one Signalement that matches the filter.
     * @param {SignalementFindUniqueArgs} args - Arguments to find a Signalement
     * @example
     * // Get one Signalement
     * const signalement = await prisma.signalement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignalementFindUniqueArgs>(args: SelectSubset<T, SignalementFindUniqueArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Signalement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SignalementFindUniqueOrThrowArgs} args - Arguments to find a Signalement
     * @example
     * // Get one Signalement
     * const signalement = await prisma.signalement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignalementFindUniqueOrThrowArgs>(args: SelectSubset<T, SignalementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signalement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementFindFirstArgs} args - Arguments to find a Signalement
     * @example
     * // Get one Signalement
     * const signalement = await prisma.signalement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignalementFindFirstArgs>(args?: SelectSubset<T, SignalementFindFirstArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signalement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementFindFirstOrThrowArgs} args - Arguments to find a Signalement
     * @example
     * // Get one Signalement
     * const signalement = await prisma.signalement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignalementFindFirstOrThrowArgs>(args?: SelectSubset<T, SignalementFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Signalements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Signalements
     * const signalements = await prisma.signalement.findMany()
     * 
     * // Get first 10 Signalements
     * const signalements = await prisma.signalement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signalementWithIdOnly = await prisma.signalement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignalementFindManyArgs>(args?: SelectSubset<T, SignalementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Signalement.
     * @param {SignalementCreateArgs} args - Arguments to create a Signalement.
     * @example
     * // Create one Signalement
     * const Signalement = await prisma.signalement.create({
     *   data: {
     *     // ... data to create a Signalement
     *   }
     * })
     * 
     */
    create<T extends SignalementCreateArgs>(args: SelectSubset<T, SignalementCreateArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Signalements.
     * @param {SignalementCreateManyArgs} args - Arguments to create many Signalements.
     * @example
     * // Create many Signalements
     * const signalement = await prisma.signalement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignalementCreateManyArgs>(args?: SelectSubset<T, SignalementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Signalements and returns the data saved in the database.
     * @param {SignalementCreateManyAndReturnArgs} args - Arguments to create many Signalements.
     * @example
     * // Create many Signalements
     * const signalement = await prisma.signalement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Signalements and only return the `id`
     * const signalementWithIdOnly = await prisma.signalement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignalementCreateManyAndReturnArgs>(args?: SelectSubset<T, SignalementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Signalement.
     * @param {SignalementDeleteArgs} args - Arguments to delete one Signalement.
     * @example
     * // Delete one Signalement
     * const Signalement = await prisma.signalement.delete({
     *   where: {
     *     // ... filter to delete one Signalement
     *   }
     * })
     * 
     */
    delete<T extends SignalementDeleteArgs>(args: SelectSubset<T, SignalementDeleteArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Signalement.
     * @param {SignalementUpdateArgs} args - Arguments to update one Signalement.
     * @example
     * // Update one Signalement
     * const signalement = await prisma.signalement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignalementUpdateArgs>(args: SelectSubset<T, SignalementUpdateArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Signalements.
     * @param {SignalementDeleteManyArgs} args - Arguments to filter Signalements to delete.
     * @example
     * // Delete a few Signalements
     * const { count } = await prisma.signalement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignalementDeleteManyArgs>(args?: SelectSubset<T, SignalementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signalements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Signalements
     * const signalement = await prisma.signalement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignalementUpdateManyArgs>(args: SelectSubset<T, SignalementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signalements and returns the data updated in the database.
     * @param {SignalementUpdateManyAndReturnArgs} args - Arguments to update many Signalements.
     * @example
     * // Update many Signalements
     * const signalement = await prisma.signalement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Signalements and only return the `id`
     * const signalementWithIdOnly = await prisma.signalement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SignalementUpdateManyAndReturnArgs>(args: SelectSubset<T, SignalementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Signalement.
     * @param {SignalementUpsertArgs} args - Arguments to update or create a Signalement.
     * @example
     * // Update or create a Signalement
     * const signalement = await prisma.signalement.upsert({
     *   create: {
     *     // ... data to create a Signalement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Signalement we want to update
     *   }
     * })
     */
    upsert<T extends SignalementUpsertArgs>(args: SelectSubset<T, SignalementUpsertArgs<ExtArgs>>): Prisma__SignalementClient<$Result.GetResult<Prisma.$SignalementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Signalements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementCountArgs} args - Arguments to filter Signalements to count.
     * @example
     * // Count the number of Signalements
     * const count = await prisma.signalement.count({
     *   where: {
     *     // ... the filter for the Signalements we want to count
     *   }
     * })
    **/
    count<T extends SignalementCountArgs>(
      args?: Subset<T, SignalementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignalementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Signalement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SignalementAggregateArgs>(args: Subset<T, SignalementAggregateArgs>): Prisma.PrismaPromise<GetSignalementAggregateType<T>>

    /**
     * Group by Signalement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SignalementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignalementGroupByArgs['orderBy'] }
        : { orderBy?: SignalementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SignalementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignalementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Signalement model
   */
  readonly fields: SignalementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Signalement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignalementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collecte<T extends CollecteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollecteDefaultArgs<ExtArgs>>): Prisma__CollecteClient<$Result.GetResult<Prisma.$CollectePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Signalement model
   */
  interface SignalementFieldRefs {
    readonly id: FieldRef<"Signalement", 'String'>
    readonly collecteId: FieldRef<"Signalement", 'String'>
    readonly reason: FieldRef<"Signalement", 'String'>
    readonly status: FieldRef<"Signalement", 'String'>
    readonly createdAt: FieldRef<"Signalement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Signalement findUnique
   */
  export type SignalementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * Filter, which Signalement to fetch.
     */
    where: SignalementWhereUniqueInput
  }

  /**
   * Signalement findUniqueOrThrow
   */
  export type SignalementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * Filter, which Signalement to fetch.
     */
    where: SignalementWhereUniqueInput
  }

  /**
   * Signalement findFirst
   */
  export type SignalementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * Filter, which Signalement to fetch.
     */
    where?: SignalementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signalements to fetch.
     */
    orderBy?: SignalementOrderByWithRelationInput | SignalementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signalements.
     */
    cursor?: SignalementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signalements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signalements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signalements.
     */
    distinct?: SignalementScalarFieldEnum | SignalementScalarFieldEnum[]
  }

  /**
   * Signalement findFirstOrThrow
   */
  export type SignalementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * Filter, which Signalement to fetch.
     */
    where?: SignalementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signalements to fetch.
     */
    orderBy?: SignalementOrderByWithRelationInput | SignalementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signalements.
     */
    cursor?: SignalementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signalements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signalements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signalements.
     */
    distinct?: SignalementScalarFieldEnum | SignalementScalarFieldEnum[]
  }

  /**
   * Signalement findMany
   */
  export type SignalementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * Filter, which Signalements to fetch.
     */
    where?: SignalementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signalements to fetch.
     */
    orderBy?: SignalementOrderByWithRelationInput | SignalementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Signalements.
     */
    cursor?: SignalementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signalements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signalements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signalements.
     */
    distinct?: SignalementScalarFieldEnum | SignalementScalarFieldEnum[]
  }

  /**
   * Signalement create
   */
  export type SignalementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * The data needed to create a Signalement.
     */
    data: XOR<SignalementCreateInput, SignalementUncheckedCreateInput>
  }

  /**
   * Signalement createMany
   */
  export type SignalementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Signalements.
     */
    data: SignalementCreateManyInput | SignalementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Signalement createManyAndReturn
   */
  export type SignalementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * The data used to create many Signalements.
     */
    data: SignalementCreateManyInput | SignalementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Signalement update
   */
  export type SignalementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * The data needed to update a Signalement.
     */
    data: XOR<SignalementUpdateInput, SignalementUncheckedUpdateInput>
    /**
     * Choose, which Signalement to update.
     */
    where: SignalementWhereUniqueInput
  }

  /**
   * Signalement updateMany
   */
  export type SignalementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Signalements.
     */
    data: XOR<SignalementUpdateManyMutationInput, SignalementUncheckedUpdateManyInput>
    /**
     * Filter which Signalements to update
     */
    where?: SignalementWhereInput
    /**
     * Limit how many Signalements to update.
     */
    limit?: number
  }

  /**
   * Signalement updateManyAndReturn
   */
  export type SignalementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * The data used to update Signalements.
     */
    data: XOR<SignalementUpdateManyMutationInput, SignalementUncheckedUpdateManyInput>
    /**
     * Filter which Signalements to update
     */
    where?: SignalementWhereInput
    /**
     * Limit how many Signalements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Signalement upsert
   */
  export type SignalementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * The filter to search for the Signalement to update in case it exists.
     */
    where: SignalementWhereUniqueInput
    /**
     * In case the Signalement found by the `where` argument doesn't exist, create a new Signalement with this data.
     */
    create: XOR<SignalementCreateInput, SignalementUncheckedCreateInput>
    /**
     * In case the Signalement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignalementUpdateInput, SignalementUncheckedUpdateInput>
  }

  /**
   * Signalement delete
   */
  export type SignalementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
    /**
     * Filter which Signalement to delete.
     */
    where: SignalementWhereUniqueInput
  }

  /**
   * Signalement deleteMany
   */
  export type SignalementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signalements to delete
     */
    where?: SignalementWhereInput
    /**
     * Limit how many Signalements to delete.
     */
    limit?: number
  }

  /**
   * Signalement without action
   */
  export type SignalementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signalement
     */
    select?: SignalementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signalement
     */
    omit?: SignalementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalementInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CollecteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    slug: 'slug',
    title: 'title',
    description: 'description',
    category: 'category',
    targetXof: 'targetXof',
    collectedXof: 'collectedXof',
    endDate: 'endDate',
    status: 'status',
    photoUrl: 'photoUrl',
    verifiedBadge: 'verifiedBadge',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CollecteScalarFieldEnum = (typeof CollecteScalarFieldEnum)[keyof typeof CollecteScalarFieldEnum]


  export const DonScalarFieldEnum: {
    id: 'id',
    collecteId: 'collecteId',
    amountXof: 'amountXof',
    paymentMethod: 'paymentMethod',
    anonymous: 'anonymous',
    donorName: 'donorName',
    status: 'status',
    transactionId: 'transactionId',
    createdAt: 'createdAt'
  };

  export type DonScalarFieldEnum = (typeof DonScalarFieldEnum)[keyof typeof DonScalarFieldEnum]


  export const RetraitScalarFieldEnum: {
    id: 'id',
    collecteId: 'collecteId',
    userId: 'userId',
    amountXof: 'amountXof',
    method: 'method',
    status: 'status',
    processedAt: 'processedAt',
    createdAt: 'createdAt'
  };

  export type RetraitScalarFieldEnum = (typeof RetraitScalarFieldEnum)[keyof typeof RetraitScalarFieldEnum]


  export const UpdateScalarFieldEnum: {
    id: 'id',
    collecteId: 'collecteId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type UpdateScalarFieldEnum = (typeof UpdateScalarFieldEnum)[keyof typeof UpdateScalarFieldEnum]


  export const SignalementScalarFieldEnum: {
    id: 'id',
    collecteId: 'collecteId',
    reason: 'reason',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type SignalementScalarFieldEnum = (typeof SignalementScalarFieldEnum)[keyof typeof SignalementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Category'
   */
  export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>
    


  /**
   * Reference to a field of type 'Category[]'
   */
  export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CollecteStatus'
   */
  export type EnumCollecteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CollecteStatus'>
    


  /**
   * Reference to a field of type 'CollecteStatus[]'
   */
  export type ListEnumCollecteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CollecteStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'WithdrawalStatus'
   */
  export type EnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus'>
    


  /**
   * Reference to a field of type 'WithdrawalStatus[]'
   */
  export type ListEnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    collectes?: CollecteListRelationFilter
    retraits?: RetraitListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    collectes?: CollecteOrderByRelationAggregateInput
    retraits?: RetraitOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    collectes?: CollecteListRelationFilter
    retraits?: RetraitListRelationFilter
  }, "id" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CollecteWhereInput = {
    AND?: CollecteWhereInput | CollecteWhereInput[]
    OR?: CollecteWhereInput[]
    NOT?: CollecteWhereInput | CollecteWhereInput[]
    id?: StringFilter<"Collecte"> | string
    userId?: StringFilter<"Collecte"> | string
    slug?: StringFilter<"Collecte"> | string
    title?: StringFilter<"Collecte"> | string
    description?: StringFilter<"Collecte"> | string
    category?: EnumCategoryFilter<"Collecte"> | $Enums.Category
    targetXof?: IntFilter<"Collecte"> | number
    collectedXof?: IntFilter<"Collecte"> | number
    endDate?: DateTimeFilter<"Collecte"> | Date | string
    status?: EnumCollecteStatusFilter<"Collecte"> | $Enums.CollecteStatus
    photoUrl?: StringNullableFilter<"Collecte"> | string | null
    verifiedBadge?: BoolFilter<"Collecte"> | boolean
    createdAt?: DateTimeFilter<"Collecte"> | Date | string
    updatedAt?: DateTimeFilter<"Collecte"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dons?: DonListRelationFilter
    updates?: UpdateListRelationFilter
    signalements?: SignalementListRelationFilter
    retraits?: RetraitListRelationFilter
  }

  export type CollecteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    targetXof?: SortOrder
    collectedXof?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    dons?: DonOrderByRelationAggregateInput
    updates?: UpdateOrderByRelationAggregateInput
    signalements?: SignalementOrderByRelationAggregateInput
    retraits?: RetraitOrderByRelationAggregateInput
  }

  export type CollecteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CollecteWhereInput | CollecteWhereInput[]
    OR?: CollecteWhereInput[]
    NOT?: CollecteWhereInput | CollecteWhereInput[]
    userId?: StringFilter<"Collecte"> | string
    title?: StringFilter<"Collecte"> | string
    description?: StringFilter<"Collecte"> | string
    category?: EnumCategoryFilter<"Collecte"> | $Enums.Category
    targetXof?: IntFilter<"Collecte"> | number
    collectedXof?: IntFilter<"Collecte"> | number
    endDate?: DateTimeFilter<"Collecte"> | Date | string
    status?: EnumCollecteStatusFilter<"Collecte"> | $Enums.CollecteStatus
    photoUrl?: StringNullableFilter<"Collecte"> | string | null
    verifiedBadge?: BoolFilter<"Collecte"> | boolean
    createdAt?: DateTimeFilter<"Collecte"> | Date | string
    updatedAt?: DateTimeFilter<"Collecte"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dons?: DonListRelationFilter
    updates?: UpdateListRelationFilter
    signalements?: SignalementListRelationFilter
    retraits?: RetraitListRelationFilter
  }, "id" | "slug">

  export type CollecteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    targetXof?: SortOrder
    collectedXof?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CollecteCountOrderByAggregateInput
    _avg?: CollecteAvgOrderByAggregateInput
    _max?: CollecteMaxOrderByAggregateInput
    _min?: CollecteMinOrderByAggregateInput
    _sum?: CollecteSumOrderByAggregateInput
  }

  export type CollecteScalarWhereWithAggregatesInput = {
    AND?: CollecteScalarWhereWithAggregatesInput | CollecteScalarWhereWithAggregatesInput[]
    OR?: CollecteScalarWhereWithAggregatesInput[]
    NOT?: CollecteScalarWhereWithAggregatesInput | CollecteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Collecte"> | string
    userId?: StringWithAggregatesFilter<"Collecte"> | string
    slug?: StringWithAggregatesFilter<"Collecte"> | string
    title?: StringWithAggregatesFilter<"Collecte"> | string
    description?: StringWithAggregatesFilter<"Collecte"> | string
    category?: EnumCategoryWithAggregatesFilter<"Collecte"> | $Enums.Category
    targetXof?: IntWithAggregatesFilter<"Collecte"> | number
    collectedXof?: IntWithAggregatesFilter<"Collecte"> | number
    endDate?: DateTimeWithAggregatesFilter<"Collecte"> | Date | string
    status?: EnumCollecteStatusWithAggregatesFilter<"Collecte"> | $Enums.CollecteStatus
    photoUrl?: StringNullableWithAggregatesFilter<"Collecte"> | string | null
    verifiedBadge?: BoolWithAggregatesFilter<"Collecte"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Collecte"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Collecte"> | Date | string
  }

  export type DonWhereInput = {
    AND?: DonWhereInput | DonWhereInput[]
    OR?: DonWhereInput[]
    NOT?: DonWhereInput | DonWhereInput[]
    id?: StringFilter<"Don"> | string
    collecteId?: StringFilter<"Don"> | string
    amountXof?: IntFilter<"Don"> | number
    paymentMethod?: StringFilter<"Don"> | string
    anonymous?: BoolFilter<"Don"> | boolean
    donorName?: StringNullableFilter<"Don"> | string | null
    status?: EnumPaymentStatusFilter<"Don"> | $Enums.PaymentStatus
    transactionId?: StringNullableFilter<"Don"> | string | null
    createdAt?: DateTimeFilter<"Don"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
  }

  export type DonOrderByWithRelationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    amountXof?: SortOrder
    paymentMethod?: SortOrder
    anonymous?: SortOrder
    donorName?: SortOrderInput | SortOrder
    status?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    collecte?: CollecteOrderByWithRelationInput
  }

  export type DonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: DonWhereInput | DonWhereInput[]
    OR?: DonWhereInput[]
    NOT?: DonWhereInput | DonWhereInput[]
    collecteId?: StringFilter<"Don"> | string
    amountXof?: IntFilter<"Don"> | number
    paymentMethod?: StringFilter<"Don"> | string
    anonymous?: BoolFilter<"Don"> | boolean
    donorName?: StringNullableFilter<"Don"> | string | null
    status?: EnumPaymentStatusFilter<"Don"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Don"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
  }, "id" | "transactionId">

  export type DonOrderByWithAggregationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    amountXof?: SortOrder
    paymentMethod?: SortOrder
    anonymous?: SortOrder
    donorName?: SortOrderInput | SortOrder
    status?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DonCountOrderByAggregateInput
    _avg?: DonAvgOrderByAggregateInput
    _max?: DonMaxOrderByAggregateInput
    _min?: DonMinOrderByAggregateInput
    _sum?: DonSumOrderByAggregateInput
  }

  export type DonScalarWhereWithAggregatesInput = {
    AND?: DonScalarWhereWithAggregatesInput | DonScalarWhereWithAggregatesInput[]
    OR?: DonScalarWhereWithAggregatesInput[]
    NOT?: DonScalarWhereWithAggregatesInput | DonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Don"> | string
    collecteId?: StringWithAggregatesFilter<"Don"> | string
    amountXof?: IntWithAggregatesFilter<"Don"> | number
    paymentMethod?: StringWithAggregatesFilter<"Don"> | string
    anonymous?: BoolWithAggregatesFilter<"Don"> | boolean
    donorName?: StringNullableWithAggregatesFilter<"Don"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Don"> | $Enums.PaymentStatus
    transactionId?: StringNullableWithAggregatesFilter<"Don"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Don"> | Date | string
  }

  export type RetraitWhereInput = {
    AND?: RetraitWhereInput | RetraitWhereInput[]
    OR?: RetraitWhereInput[]
    NOT?: RetraitWhereInput | RetraitWhereInput[]
    id?: StringFilter<"Retrait"> | string
    collecteId?: StringFilter<"Retrait"> | string
    userId?: StringFilter<"Retrait"> | string
    amountXof?: IntFilter<"Retrait"> | number
    method?: StringFilter<"Retrait"> | string
    status?: EnumWithdrawalStatusFilter<"Retrait"> | $Enums.WithdrawalStatus
    processedAt?: DateTimeNullableFilter<"Retrait"> | Date | string | null
    createdAt?: DateTimeFilter<"Retrait"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RetraitOrderByWithRelationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    userId?: SortOrder
    amountXof?: SortOrder
    method?: SortOrder
    status?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    collecte?: CollecteOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type RetraitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RetraitWhereInput | RetraitWhereInput[]
    OR?: RetraitWhereInput[]
    NOT?: RetraitWhereInput | RetraitWhereInput[]
    collecteId?: StringFilter<"Retrait"> | string
    userId?: StringFilter<"Retrait"> | string
    amountXof?: IntFilter<"Retrait"> | number
    method?: StringFilter<"Retrait"> | string
    status?: EnumWithdrawalStatusFilter<"Retrait"> | $Enums.WithdrawalStatus
    processedAt?: DateTimeNullableFilter<"Retrait"> | Date | string | null
    createdAt?: DateTimeFilter<"Retrait"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RetraitOrderByWithAggregationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    userId?: SortOrder
    amountXof?: SortOrder
    method?: SortOrder
    status?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RetraitCountOrderByAggregateInput
    _avg?: RetraitAvgOrderByAggregateInput
    _max?: RetraitMaxOrderByAggregateInput
    _min?: RetraitMinOrderByAggregateInput
    _sum?: RetraitSumOrderByAggregateInput
  }

  export type RetraitScalarWhereWithAggregatesInput = {
    AND?: RetraitScalarWhereWithAggregatesInput | RetraitScalarWhereWithAggregatesInput[]
    OR?: RetraitScalarWhereWithAggregatesInput[]
    NOT?: RetraitScalarWhereWithAggregatesInput | RetraitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Retrait"> | string
    collecteId?: StringWithAggregatesFilter<"Retrait"> | string
    userId?: StringWithAggregatesFilter<"Retrait"> | string
    amountXof?: IntWithAggregatesFilter<"Retrait"> | number
    method?: StringWithAggregatesFilter<"Retrait"> | string
    status?: EnumWithdrawalStatusWithAggregatesFilter<"Retrait"> | $Enums.WithdrawalStatus
    processedAt?: DateTimeNullableWithAggregatesFilter<"Retrait"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Retrait"> | Date | string
  }

  export type UpdateWhereInput = {
    AND?: UpdateWhereInput | UpdateWhereInput[]
    OR?: UpdateWhereInput[]
    NOT?: UpdateWhereInput | UpdateWhereInput[]
    id?: StringFilter<"Update"> | string
    collecteId?: StringFilter<"Update"> | string
    content?: StringFilter<"Update"> | string
    createdAt?: DateTimeFilter<"Update"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
  }

  export type UpdateOrderByWithRelationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    collecte?: CollecteOrderByWithRelationInput
  }

  export type UpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UpdateWhereInput | UpdateWhereInput[]
    OR?: UpdateWhereInput[]
    NOT?: UpdateWhereInput | UpdateWhereInput[]
    collecteId?: StringFilter<"Update"> | string
    content?: StringFilter<"Update"> | string
    createdAt?: DateTimeFilter<"Update"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
  }, "id">

  export type UpdateOrderByWithAggregationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: UpdateCountOrderByAggregateInput
    _max?: UpdateMaxOrderByAggregateInput
    _min?: UpdateMinOrderByAggregateInput
  }

  export type UpdateScalarWhereWithAggregatesInput = {
    AND?: UpdateScalarWhereWithAggregatesInput | UpdateScalarWhereWithAggregatesInput[]
    OR?: UpdateScalarWhereWithAggregatesInput[]
    NOT?: UpdateScalarWhereWithAggregatesInput | UpdateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Update"> | string
    collecteId?: StringWithAggregatesFilter<"Update"> | string
    content?: StringWithAggregatesFilter<"Update"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Update"> | Date | string
  }

  export type SignalementWhereInput = {
    AND?: SignalementWhereInput | SignalementWhereInput[]
    OR?: SignalementWhereInput[]
    NOT?: SignalementWhereInput | SignalementWhereInput[]
    id?: StringFilter<"Signalement"> | string
    collecteId?: StringFilter<"Signalement"> | string
    reason?: StringFilter<"Signalement"> | string
    status?: StringFilter<"Signalement"> | string
    createdAt?: DateTimeFilter<"Signalement"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
  }

  export type SignalementOrderByWithRelationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    collecte?: CollecteOrderByWithRelationInput
  }

  export type SignalementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SignalementWhereInput | SignalementWhereInput[]
    OR?: SignalementWhereInput[]
    NOT?: SignalementWhereInput | SignalementWhereInput[]
    collecteId?: StringFilter<"Signalement"> | string
    reason?: StringFilter<"Signalement"> | string
    status?: StringFilter<"Signalement"> | string
    createdAt?: DateTimeFilter<"Signalement"> | Date | string
    collecte?: XOR<CollecteScalarRelationFilter, CollecteWhereInput>
  }, "id">

  export type SignalementOrderByWithAggregationInput = {
    id?: SortOrder
    collecteId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: SignalementCountOrderByAggregateInput
    _max?: SignalementMaxOrderByAggregateInput
    _min?: SignalementMinOrderByAggregateInput
  }

  export type SignalementScalarWhereWithAggregatesInput = {
    AND?: SignalementScalarWhereWithAggregatesInput | SignalementScalarWhereWithAggregatesInput[]
    OR?: SignalementScalarWhereWithAggregatesInput[]
    NOT?: SignalementScalarWhereWithAggregatesInput | SignalementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Signalement"> | string
    collecteId?: StringWithAggregatesFilter<"Signalement"> | string
    reason?: StringWithAggregatesFilter<"Signalement"> | string
    status?: StringWithAggregatesFilter<"Signalement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Signalement"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    collectes?: CollecteCreateNestedManyWithoutUserInput
    retraits?: RetraitCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    collectes?: CollecteUncheckedCreateNestedManyWithoutUserInput
    retraits?: RetraitUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collectes?: CollecteUpdateManyWithoutUserNestedInput
    retraits?: RetraitUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collectes?: CollecteUncheckedUpdateManyWithoutUserNestedInput
    retraits?: RetraitUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollecteCreateInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollectesInput
    dons?: DonCreateNestedManyWithoutCollecteInput
    updates?: UpdateCreateNestedManyWithoutCollecteInput
    signalements?: SignalementCreateNestedManyWithoutCollecteInput
    retraits?: RetraitCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUncheckedCreateInput = {
    id?: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dons?: DonUncheckedCreateNestedManyWithoutCollecteInput
    updates?: UpdateUncheckedCreateNestedManyWithoutCollecteInput
    signalements?: SignalementUncheckedCreateNestedManyWithoutCollecteInput
    retraits?: RetraitUncheckedCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollectesNestedInput
    dons?: DonUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dons?: DonUncheckedUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUncheckedUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUncheckedUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUncheckedUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteCreateManyInput = {
    id?: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollecteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollecteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonCreateInput = {
    id?: string
    amountXof: number
    paymentMethod: string
    anonymous?: boolean
    donorName?: string | null
    status?: $Enums.PaymentStatus
    transactionId?: string | null
    createdAt?: Date | string
    collecte: CollecteCreateNestedOneWithoutDonsInput
  }

  export type DonUncheckedCreateInput = {
    id?: string
    collecteId: string
    amountXof: number
    paymentMethod: string
    anonymous?: boolean
    donorName?: string | null
    status?: $Enums.PaymentStatus
    transactionId?: string | null
    createdAt?: Date | string
  }

  export type DonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collecte?: CollecteUpdateOneRequiredWithoutDonsNestedInput
  }

  export type DonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonCreateManyInput = {
    id?: string
    collecteId: string
    amountXof: number
    paymentMethod: string
    anonymous?: boolean
    donorName?: string | null
    status?: $Enums.PaymentStatus
    transactionId?: string | null
    createdAt?: Date | string
  }

  export type DonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitCreateInput = {
    id?: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
    collecte: CollecteCreateNestedOneWithoutRetraitsInput
    user: UserCreateNestedOneWithoutRetraitsInput
  }

  export type RetraitUncheckedCreateInput = {
    id?: string
    collecteId: string
    userId: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RetraitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collecte?: CollecteUpdateOneRequiredWithoutRetraitsNestedInput
    user?: UserUpdateOneRequiredWithoutRetraitsNestedInput
  }

  export type RetraitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitCreateManyInput = {
    id?: string
    collecteId: string
    userId: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RetraitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    collecte: CollecteCreateNestedOneWithoutUpdatesInput
  }

  export type UpdateUncheckedCreateInput = {
    id?: string
    collecteId: string
    content: string
    createdAt?: Date | string
  }

  export type UpdateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collecte?: CollecteUpdateOneRequiredWithoutUpdatesNestedInput
  }

  export type UpdateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateCreateManyInput = {
    id?: string
    collecteId: string
    content: string
    createdAt?: Date | string
  }

  export type UpdateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalementCreateInput = {
    id?: string
    reason: string
    status?: string
    createdAt?: Date | string
    collecte: CollecteCreateNestedOneWithoutSignalementsInput
  }

  export type SignalementUncheckedCreateInput = {
    id?: string
    collecteId: string
    reason: string
    status?: string
    createdAt?: Date | string
  }

  export type SignalementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collecte?: CollecteUpdateOneRequiredWithoutSignalementsNestedInput
  }

  export type SignalementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalementCreateManyInput = {
    id?: string
    collecteId: string
    reason: string
    status?: string
    createdAt?: Date | string
  }

  export type SignalementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CollecteListRelationFilter = {
    every?: CollecteWhereInput
    some?: CollecteWhereInput
    none?: CollecteWhereInput
  }

  export type RetraitListRelationFilter = {
    every?: RetraitWhereInput
    some?: RetraitWhereInput
    none?: RetraitWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CollecteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RetraitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumCollecteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CollecteStatus | EnumCollecteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCollecteStatusFilter<$PrismaModel> | $Enums.CollecteStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DonListRelationFilter = {
    every?: DonWhereInput
    some?: DonWhereInput
    none?: DonWhereInput
  }

  export type UpdateListRelationFilter = {
    every?: UpdateWhereInput
    some?: UpdateWhereInput
    none?: UpdateWhereInput
  }

  export type SignalementListRelationFilter = {
    every?: SignalementWhereInput
    some?: SignalementWhereInput
    none?: SignalementWhereInput
  }

  export type DonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UpdateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SignalementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollecteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    targetXof?: SortOrder
    collectedXof?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    photoUrl?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollecteAvgOrderByAggregateInput = {
    targetXof?: SortOrder
    collectedXof?: SortOrder
  }

  export type CollecteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    targetXof?: SortOrder
    collectedXof?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    photoUrl?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollecteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    targetXof?: SortOrder
    collectedXof?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    photoUrl?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollecteSumOrderByAggregateInput = {
    targetXof?: SortOrder
    collectedXof?: SortOrder
  }

  export type EnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumCollecteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CollecteStatus | EnumCollecteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCollecteStatusWithAggregatesFilter<$PrismaModel> | $Enums.CollecteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCollecteStatusFilter<$PrismaModel>
    _max?: NestedEnumCollecteStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type CollecteScalarRelationFilter = {
    is?: CollecteWhereInput
    isNot?: CollecteWhereInput
  }

  export type DonCountOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    amountXof?: SortOrder
    paymentMethod?: SortOrder
    anonymous?: SortOrder
    donorName?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type DonAvgOrderByAggregateInput = {
    amountXof?: SortOrder
  }

  export type DonMaxOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    amountXof?: SortOrder
    paymentMethod?: SortOrder
    anonymous?: SortOrder
    donorName?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type DonMinOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    amountXof?: SortOrder
    paymentMethod?: SortOrder
    anonymous?: SortOrder
    donorName?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type DonSumOrderByAggregateInput = {
    amountXof?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumWithdrawalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusFilter<$PrismaModel> | $Enums.WithdrawalStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RetraitCountOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    userId?: SortOrder
    amountXof?: SortOrder
    method?: SortOrder
    status?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RetraitAvgOrderByAggregateInput = {
    amountXof?: SortOrder
  }

  export type RetraitMaxOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    userId?: SortOrder
    amountXof?: SortOrder
    method?: SortOrder
    status?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RetraitMinOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    userId?: SortOrder
    amountXof?: SortOrder
    method?: SortOrder
    status?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RetraitSumOrderByAggregateInput = {
    amountXof?: SortOrder
  }

  export type EnumWithdrawalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel> | $Enums.WithdrawalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
    _max?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UpdateCountOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type UpdateMaxOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type UpdateMinOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type SignalementCountOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SignalementMaxOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SignalementMinOrderByAggregateInput = {
    id?: SortOrder
    collecteId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CollecteCreateNestedManyWithoutUserInput = {
    create?: XOR<CollecteCreateWithoutUserInput, CollecteUncheckedCreateWithoutUserInput> | CollecteCreateWithoutUserInput[] | CollecteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollecteCreateOrConnectWithoutUserInput | CollecteCreateOrConnectWithoutUserInput[]
    createMany?: CollecteCreateManyUserInputEnvelope
    connect?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
  }

  export type RetraitCreateNestedManyWithoutUserInput = {
    create?: XOR<RetraitCreateWithoutUserInput, RetraitUncheckedCreateWithoutUserInput> | RetraitCreateWithoutUserInput[] | RetraitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutUserInput | RetraitCreateOrConnectWithoutUserInput[]
    createMany?: RetraitCreateManyUserInputEnvelope
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
  }

  export type CollecteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CollecteCreateWithoutUserInput, CollecteUncheckedCreateWithoutUserInput> | CollecteCreateWithoutUserInput[] | CollecteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollecteCreateOrConnectWithoutUserInput | CollecteCreateOrConnectWithoutUserInput[]
    createMany?: CollecteCreateManyUserInputEnvelope
    connect?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
  }

  export type RetraitUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RetraitCreateWithoutUserInput, RetraitUncheckedCreateWithoutUserInput> | RetraitCreateWithoutUserInput[] | RetraitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutUserInput | RetraitCreateOrConnectWithoutUserInput[]
    createMany?: RetraitCreateManyUserInputEnvelope
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CollecteUpdateManyWithoutUserNestedInput = {
    create?: XOR<CollecteCreateWithoutUserInput, CollecteUncheckedCreateWithoutUserInput> | CollecteCreateWithoutUserInput[] | CollecteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollecteCreateOrConnectWithoutUserInput | CollecteCreateOrConnectWithoutUserInput[]
    upsert?: CollecteUpsertWithWhereUniqueWithoutUserInput | CollecteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CollecteCreateManyUserInputEnvelope
    set?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    disconnect?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    delete?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    connect?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    update?: CollecteUpdateWithWhereUniqueWithoutUserInput | CollecteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CollecteUpdateManyWithWhereWithoutUserInput | CollecteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CollecteScalarWhereInput | CollecteScalarWhereInput[]
  }

  export type RetraitUpdateManyWithoutUserNestedInput = {
    create?: XOR<RetraitCreateWithoutUserInput, RetraitUncheckedCreateWithoutUserInput> | RetraitCreateWithoutUserInput[] | RetraitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutUserInput | RetraitCreateOrConnectWithoutUserInput[]
    upsert?: RetraitUpsertWithWhereUniqueWithoutUserInput | RetraitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RetraitCreateManyUserInputEnvelope
    set?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    disconnect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    delete?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    update?: RetraitUpdateWithWhereUniqueWithoutUserInput | RetraitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RetraitUpdateManyWithWhereWithoutUserInput | RetraitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RetraitScalarWhereInput | RetraitScalarWhereInput[]
  }

  export type CollecteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CollecteCreateWithoutUserInput, CollecteUncheckedCreateWithoutUserInput> | CollecteCreateWithoutUserInput[] | CollecteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollecteCreateOrConnectWithoutUserInput | CollecteCreateOrConnectWithoutUserInput[]
    upsert?: CollecteUpsertWithWhereUniqueWithoutUserInput | CollecteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CollecteCreateManyUserInputEnvelope
    set?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    disconnect?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    delete?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    connect?: CollecteWhereUniqueInput | CollecteWhereUniqueInput[]
    update?: CollecteUpdateWithWhereUniqueWithoutUserInput | CollecteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CollecteUpdateManyWithWhereWithoutUserInput | CollecteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CollecteScalarWhereInput | CollecteScalarWhereInput[]
  }

  export type RetraitUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RetraitCreateWithoutUserInput, RetraitUncheckedCreateWithoutUserInput> | RetraitCreateWithoutUserInput[] | RetraitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutUserInput | RetraitCreateOrConnectWithoutUserInput[]
    upsert?: RetraitUpsertWithWhereUniqueWithoutUserInput | RetraitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RetraitCreateManyUserInputEnvelope
    set?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    disconnect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    delete?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    update?: RetraitUpdateWithWhereUniqueWithoutUserInput | RetraitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RetraitUpdateManyWithWhereWithoutUserInput | RetraitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RetraitScalarWhereInput | RetraitScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCollectesInput = {
    create?: XOR<UserCreateWithoutCollectesInput, UserUncheckedCreateWithoutCollectesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCollectesInput
    connect?: UserWhereUniqueInput
  }

  export type DonCreateNestedManyWithoutCollecteInput = {
    create?: XOR<DonCreateWithoutCollecteInput, DonUncheckedCreateWithoutCollecteInput> | DonCreateWithoutCollecteInput[] | DonUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: DonCreateOrConnectWithoutCollecteInput | DonCreateOrConnectWithoutCollecteInput[]
    createMany?: DonCreateManyCollecteInputEnvelope
    connect?: DonWhereUniqueInput | DonWhereUniqueInput[]
  }

  export type UpdateCreateNestedManyWithoutCollecteInput = {
    create?: XOR<UpdateCreateWithoutCollecteInput, UpdateUncheckedCreateWithoutCollecteInput> | UpdateCreateWithoutCollecteInput[] | UpdateUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: UpdateCreateOrConnectWithoutCollecteInput | UpdateCreateOrConnectWithoutCollecteInput[]
    createMany?: UpdateCreateManyCollecteInputEnvelope
    connect?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
  }

  export type SignalementCreateNestedManyWithoutCollecteInput = {
    create?: XOR<SignalementCreateWithoutCollecteInput, SignalementUncheckedCreateWithoutCollecteInput> | SignalementCreateWithoutCollecteInput[] | SignalementUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: SignalementCreateOrConnectWithoutCollecteInput | SignalementCreateOrConnectWithoutCollecteInput[]
    createMany?: SignalementCreateManyCollecteInputEnvelope
    connect?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
  }

  export type RetraitCreateNestedManyWithoutCollecteInput = {
    create?: XOR<RetraitCreateWithoutCollecteInput, RetraitUncheckedCreateWithoutCollecteInput> | RetraitCreateWithoutCollecteInput[] | RetraitUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutCollecteInput | RetraitCreateOrConnectWithoutCollecteInput[]
    createMany?: RetraitCreateManyCollecteInputEnvelope
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
  }

  export type DonUncheckedCreateNestedManyWithoutCollecteInput = {
    create?: XOR<DonCreateWithoutCollecteInput, DonUncheckedCreateWithoutCollecteInput> | DonCreateWithoutCollecteInput[] | DonUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: DonCreateOrConnectWithoutCollecteInput | DonCreateOrConnectWithoutCollecteInput[]
    createMany?: DonCreateManyCollecteInputEnvelope
    connect?: DonWhereUniqueInput | DonWhereUniqueInput[]
  }

  export type UpdateUncheckedCreateNestedManyWithoutCollecteInput = {
    create?: XOR<UpdateCreateWithoutCollecteInput, UpdateUncheckedCreateWithoutCollecteInput> | UpdateCreateWithoutCollecteInput[] | UpdateUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: UpdateCreateOrConnectWithoutCollecteInput | UpdateCreateOrConnectWithoutCollecteInput[]
    createMany?: UpdateCreateManyCollecteInputEnvelope
    connect?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
  }

  export type SignalementUncheckedCreateNestedManyWithoutCollecteInput = {
    create?: XOR<SignalementCreateWithoutCollecteInput, SignalementUncheckedCreateWithoutCollecteInput> | SignalementCreateWithoutCollecteInput[] | SignalementUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: SignalementCreateOrConnectWithoutCollecteInput | SignalementCreateOrConnectWithoutCollecteInput[]
    createMany?: SignalementCreateManyCollecteInputEnvelope
    connect?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
  }

  export type RetraitUncheckedCreateNestedManyWithoutCollecteInput = {
    create?: XOR<RetraitCreateWithoutCollecteInput, RetraitUncheckedCreateWithoutCollecteInput> | RetraitCreateWithoutCollecteInput[] | RetraitUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutCollecteInput | RetraitCreateOrConnectWithoutCollecteInput[]
    createMany?: RetraitCreateManyCollecteInputEnvelope
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
  }

  export type EnumCategoryFieldUpdateOperationsInput = {
    set?: $Enums.Category
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCollecteStatusFieldUpdateOperationsInput = {
    set?: $Enums.CollecteStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutCollectesNestedInput = {
    create?: XOR<UserCreateWithoutCollectesInput, UserUncheckedCreateWithoutCollectesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCollectesInput
    upsert?: UserUpsertWithoutCollectesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCollectesInput, UserUpdateWithoutCollectesInput>, UserUncheckedUpdateWithoutCollectesInput>
  }

  export type DonUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<DonCreateWithoutCollecteInput, DonUncheckedCreateWithoutCollecteInput> | DonCreateWithoutCollecteInput[] | DonUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: DonCreateOrConnectWithoutCollecteInput | DonCreateOrConnectWithoutCollecteInput[]
    upsert?: DonUpsertWithWhereUniqueWithoutCollecteInput | DonUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: DonCreateManyCollecteInputEnvelope
    set?: DonWhereUniqueInput | DonWhereUniqueInput[]
    disconnect?: DonWhereUniqueInput | DonWhereUniqueInput[]
    delete?: DonWhereUniqueInput | DonWhereUniqueInput[]
    connect?: DonWhereUniqueInput | DonWhereUniqueInput[]
    update?: DonUpdateWithWhereUniqueWithoutCollecteInput | DonUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: DonUpdateManyWithWhereWithoutCollecteInput | DonUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: DonScalarWhereInput | DonScalarWhereInput[]
  }

  export type UpdateUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<UpdateCreateWithoutCollecteInput, UpdateUncheckedCreateWithoutCollecteInput> | UpdateCreateWithoutCollecteInput[] | UpdateUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: UpdateCreateOrConnectWithoutCollecteInput | UpdateCreateOrConnectWithoutCollecteInput[]
    upsert?: UpdateUpsertWithWhereUniqueWithoutCollecteInput | UpdateUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: UpdateCreateManyCollecteInputEnvelope
    set?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    disconnect?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    delete?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    connect?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    update?: UpdateUpdateWithWhereUniqueWithoutCollecteInput | UpdateUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: UpdateUpdateManyWithWhereWithoutCollecteInput | UpdateUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: UpdateScalarWhereInput | UpdateScalarWhereInput[]
  }

  export type SignalementUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<SignalementCreateWithoutCollecteInput, SignalementUncheckedCreateWithoutCollecteInput> | SignalementCreateWithoutCollecteInput[] | SignalementUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: SignalementCreateOrConnectWithoutCollecteInput | SignalementCreateOrConnectWithoutCollecteInput[]
    upsert?: SignalementUpsertWithWhereUniqueWithoutCollecteInput | SignalementUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: SignalementCreateManyCollecteInputEnvelope
    set?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    disconnect?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    delete?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    connect?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    update?: SignalementUpdateWithWhereUniqueWithoutCollecteInput | SignalementUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: SignalementUpdateManyWithWhereWithoutCollecteInput | SignalementUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: SignalementScalarWhereInput | SignalementScalarWhereInput[]
  }

  export type RetraitUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<RetraitCreateWithoutCollecteInput, RetraitUncheckedCreateWithoutCollecteInput> | RetraitCreateWithoutCollecteInput[] | RetraitUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutCollecteInput | RetraitCreateOrConnectWithoutCollecteInput[]
    upsert?: RetraitUpsertWithWhereUniqueWithoutCollecteInput | RetraitUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: RetraitCreateManyCollecteInputEnvelope
    set?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    disconnect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    delete?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    update?: RetraitUpdateWithWhereUniqueWithoutCollecteInput | RetraitUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: RetraitUpdateManyWithWhereWithoutCollecteInput | RetraitUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: RetraitScalarWhereInput | RetraitScalarWhereInput[]
  }

  export type DonUncheckedUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<DonCreateWithoutCollecteInput, DonUncheckedCreateWithoutCollecteInput> | DonCreateWithoutCollecteInput[] | DonUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: DonCreateOrConnectWithoutCollecteInput | DonCreateOrConnectWithoutCollecteInput[]
    upsert?: DonUpsertWithWhereUniqueWithoutCollecteInput | DonUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: DonCreateManyCollecteInputEnvelope
    set?: DonWhereUniqueInput | DonWhereUniqueInput[]
    disconnect?: DonWhereUniqueInput | DonWhereUniqueInput[]
    delete?: DonWhereUniqueInput | DonWhereUniqueInput[]
    connect?: DonWhereUniqueInput | DonWhereUniqueInput[]
    update?: DonUpdateWithWhereUniqueWithoutCollecteInput | DonUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: DonUpdateManyWithWhereWithoutCollecteInput | DonUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: DonScalarWhereInput | DonScalarWhereInput[]
  }

  export type UpdateUncheckedUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<UpdateCreateWithoutCollecteInput, UpdateUncheckedCreateWithoutCollecteInput> | UpdateCreateWithoutCollecteInput[] | UpdateUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: UpdateCreateOrConnectWithoutCollecteInput | UpdateCreateOrConnectWithoutCollecteInput[]
    upsert?: UpdateUpsertWithWhereUniqueWithoutCollecteInput | UpdateUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: UpdateCreateManyCollecteInputEnvelope
    set?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    disconnect?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    delete?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    connect?: UpdateWhereUniqueInput | UpdateWhereUniqueInput[]
    update?: UpdateUpdateWithWhereUniqueWithoutCollecteInput | UpdateUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: UpdateUpdateManyWithWhereWithoutCollecteInput | UpdateUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: UpdateScalarWhereInput | UpdateScalarWhereInput[]
  }

  export type SignalementUncheckedUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<SignalementCreateWithoutCollecteInput, SignalementUncheckedCreateWithoutCollecteInput> | SignalementCreateWithoutCollecteInput[] | SignalementUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: SignalementCreateOrConnectWithoutCollecteInput | SignalementCreateOrConnectWithoutCollecteInput[]
    upsert?: SignalementUpsertWithWhereUniqueWithoutCollecteInput | SignalementUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: SignalementCreateManyCollecteInputEnvelope
    set?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    disconnect?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    delete?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    connect?: SignalementWhereUniqueInput | SignalementWhereUniqueInput[]
    update?: SignalementUpdateWithWhereUniqueWithoutCollecteInput | SignalementUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: SignalementUpdateManyWithWhereWithoutCollecteInput | SignalementUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: SignalementScalarWhereInput | SignalementScalarWhereInput[]
  }

  export type RetraitUncheckedUpdateManyWithoutCollecteNestedInput = {
    create?: XOR<RetraitCreateWithoutCollecteInput, RetraitUncheckedCreateWithoutCollecteInput> | RetraitCreateWithoutCollecteInput[] | RetraitUncheckedCreateWithoutCollecteInput[]
    connectOrCreate?: RetraitCreateOrConnectWithoutCollecteInput | RetraitCreateOrConnectWithoutCollecteInput[]
    upsert?: RetraitUpsertWithWhereUniqueWithoutCollecteInput | RetraitUpsertWithWhereUniqueWithoutCollecteInput[]
    createMany?: RetraitCreateManyCollecteInputEnvelope
    set?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    disconnect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    delete?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    connect?: RetraitWhereUniqueInput | RetraitWhereUniqueInput[]
    update?: RetraitUpdateWithWhereUniqueWithoutCollecteInput | RetraitUpdateWithWhereUniqueWithoutCollecteInput[]
    updateMany?: RetraitUpdateManyWithWhereWithoutCollecteInput | RetraitUpdateManyWithWhereWithoutCollecteInput[]
    deleteMany?: RetraitScalarWhereInput | RetraitScalarWhereInput[]
  }

  export type CollecteCreateNestedOneWithoutDonsInput = {
    create?: XOR<CollecteCreateWithoutDonsInput, CollecteUncheckedCreateWithoutDonsInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutDonsInput
    connect?: CollecteWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type CollecteUpdateOneRequiredWithoutDonsNestedInput = {
    create?: XOR<CollecteCreateWithoutDonsInput, CollecteUncheckedCreateWithoutDonsInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutDonsInput
    upsert?: CollecteUpsertWithoutDonsInput
    connect?: CollecteWhereUniqueInput
    update?: XOR<XOR<CollecteUpdateToOneWithWhereWithoutDonsInput, CollecteUpdateWithoutDonsInput>, CollecteUncheckedUpdateWithoutDonsInput>
  }

  export type CollecteCreateNestedOneWithoutRetraitsInput = {
    create?: XOR<CollecteCreateWithoutRetraitsInput, CollecteUncheckedCreateWithoutRetraitsInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutRetraitsInput
    connect?: CollecteWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRetraitsInput = {
    create?: XOR<UserCreateWithoutRetraitsInput, UserUncheckedCreateWithoutRetraitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRetraitsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumWithdrawalStatusFieldUpdateOperationsInput = {
    set?: $Enums.WithdrawalStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CollecteUpdateOneRequiredWithoutRetraitsNestedInput = {
    create?: XOR<CollecteCreateWithoutRetraitsInput, CollecteUncheckedCreateWithoutRetraitsInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutRetraitsInput
    upsert?: CollecteUpsertWithoutRetraitsInput
    connect?: CollecteWhereUniqueInput
    update?: XOR<XOR<CollecteUpdateToOneWithWhereWithoutRetraitsInput, CollecteUpdateWithoutRetraitsInput>, CollecteUncheckedUpdateWithoutRetraitsInput>
  }

  export type UserUpdateOneRequiredWithoutRetraitsNestedInput = {
    create?: XOR<UserCreateWithoutRetraitsInput, UserUncheckedCreateWithoutRetraitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRetraitsInput
    upsert?: UserUpsertWithoutRetraitsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRetraitsInput, UserUpdateWithoutRetraitsInput>, UserUncheckedUpdateWithoutRetraitsInput>
  }

  export type CollecteCreateNestedOneWithoutUpdatesInput = {
    create?: XOR<CollecteCreateWithoutUpdatesInput, CollecteUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutUpdatesInput
    connect?: CollecteWhereUniqueInput
  }

  export type CollecteUpdateOneRequiredWithoutUpdatesNestedInput = {
    create?: XOR<CollecteCreateWithoutUpdatesInput, CollecteUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutUpdatesInput
    upsert?: CollecteUpsertWithoutUpdatesInput
    connect?: CollecteWhereUniqueInput
    update?: XOR<XOR<CollecteUpdateToOneWithWhereWithoutUpdatesInput, CollecteUpdateWithoutUpdatesInput>, CollecteUncheckedUpdateWithoutUpdatesInput>
  }

  export type CollecteCreateNestedOneWithoutSignalementsInput = {
    create?: XOR<CollecteCreateWithoutSignalementsInput, CollecteUncheckedCreateWithoutSignalementsInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutSignalementsInput
    connect?: CollecteWhereUniqueInput
  }

  export type CollecteUpdateOneRequiredWithoutSignalementsNestedInput = {
    create?: XOR<CollecteCreateWithoutSignalementsInput, CollecteUncheckedCreateWithoutSignalementsInput>
    connectOrCreate?: CollecteCreateOrConnectWithoutSignalementsInput
    upsert?: CollecteUpsertWithoutSignalementsInput
    connect?: CollecteWhereUniqueInput
    update?: XOR<XOR<CollecteUpdateToOneWithWhereWithoutSignalementsInput, CollecteUpdateWithoutSignalementsInput>, CollecteUncheckedUpdateWithoutSignalementsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type NestedEnumCollecteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CollecteStatus | EnumCollecteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCollecteStatusFilter<$PrismaModel> | $Enums.CollecteStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCollecteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CollecteStatus | EnumCollecteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollecteStatus[] | ListEnumCollecteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCollecteStatusWithAggregatesFilter<$PrismaModel> | $Enums.CollecteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCollecteStatusFilter<$PrismaModel>
    _max?: NestedEnumCollecteStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumWithdrawalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusFilter<$PrismaModel> | $Enums.WithdrawalStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel> | $Enums.WithdrawalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
    _max?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CollecteCreateWithoutUserInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dons?: DonCreateNestedManyWithoutCollecteInput
    updates?: UpdateCreateNestedManyWithoutCollecteInput
    signalements?: SignalementCreateNestedManyWithoutCollecteInput
    retraits?: RetraitCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUncheckedCreateWithoutUserInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dons?: DonUncheckedCreateNestedManyWithoutCollecteInput
    updates?: UpdateUncheckedCreateNestedManyWithoutCollecteInput
    signalements?: SignalementUncheckedCreateNestedManyWithoutCollecteInput
    retraits?: RetraitUncheckedCreateNestedManyWithoutCollecteInput
  }

  export type CollecteCreateOrConnectWithoutUserInput = {
    where: CollecteWhereUniqueInput
    create: XOR<CollecteCreateWithoutUserInput, CollecteUncheckedCreateWithoutUserInput>
  }

  export type CollecteCreateManyUserInputEnvelope = {
    data: CollecteCreateManyUserInput | CollecteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RetraitCreateWithoutUserInput = {
    id?: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
    collecte: CollecteCreateNestedOneWithoutRetraitsInput
  }

  export type RetraitUncheckedCreateWithoutUserInput = {
    id?: string
    collecteId: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RetraitCreateOrConnectWithoutUserInput = {
    where: RetraitWhereUniqueInput
    create: XOR<RetraitCreateWithoutUserInput, RetraitUncheckedCreateWithoutUserInput>
  }

  export type RetraitCreateManyUserInputEnvelope = {
    data: RetraitCreateManyUserInput | RetraitCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CollecteUpsertWithWhereUniqueWithoutUserInput = {
    where: CollecteWhereUniqueInput
    update: XOR<CollecteUpdateWithoutUserInput, CollecteUncheckedUpdateWithoutUserInput>
    create: XOR<CollecteCreateWithoutUserInput, CollecteUncheckedCreateWithoutUserInput>
  }

  export type CollecteUpdateWithWhereUniqueWithoutUserInput = {
    where: CollecteWhereUniqueInput
    data: XOR<CollecteUpdateWithoutUserInput, CollecteUncheckedUpdateWithoutUserInput>
  }

  export type CollecteUpdateManyWithWhereWithoutUserInput = {
    where: CollecteScalarWhereInput
    data: XOR<CollecteUpdateManyMutationInput, CollecteUncheckedUpdateManyWithoutUserInput>
  }

  export type CollecteScalarWhereInput = {
    AND?: CollecteScalarWhereInput | CollecteScalarWhereInput[]
    OR?: CollecteScalarWhereInput[]
    NOT?: CollecteScalarWhereInput | CollecteScalarWhereInput[]
    id?: StringFilter<"Collecte"> | string
    userId?: StringFilter<"Collecte"> | string
    slug?: StringFilter<"Collecte"> | string
    title?: StringFilter<"Collecte"> | string
    description?: StringFilter<"Collecte"> | string
    category?: EnumCategoryFilter<"Collecte"> | $Enums.Category
    targetXof?: IntFilter<"Collecte"> | number
    collectedXof?: IntFilter<"Collecte"> | number
    endDate?: DateTimeFilter<"Collecte"> | Date | string
    status?: EnumCollecteStatusFilter<"Collecte"> | $Enums.CollecteStatus
    photoUrl?: StringNullableFilter<"Collecte"> | string | null
    verifiedBadge?: BoolFilter<"Collecte"> | boolean
    createdAt?: DateTimeFilter<"Collecte"> | Date | string
    updatedAt?: DateTimeFilter<"Collecte"> | Date | string
  }

  export type RetraitUpsertWithWhereUniqueWithoutUserInput = {
    where: RetraitWhereUniqueInput
    update: XOR<RetraitUpdateWithoutUserInput, RetraitUncheckedUpdateWithoutUserInput>
    create: XOR<RetraitCreateWithoutUserInput, RetraitUncheckedCreateWithoutUserInput>
  }

  export type RetraitUpdateWithWhereUniqueWithoutUserInput = {
    where: RetraitWhereUniqueInput
    data: XOR<RetraitUpdateWithoutUserInput, RetraitUncheckedUpdateWithoutUserInput>
  }

  export type RetraitUpdateManyWithWhereWithoutUserInput = {
    where: RetraitScalarWhereInput
    data: XOR<RetraitUpdateManyMutationInput, RetraitUncheckedUpdateManyWithoutUserInput>
  }

  export type RetraitScalarWhereInput = {
    AND?: RetraitScalarWhereInput | RetraitScalarWhereInput[]
    OR?: RetraitScalarWhereInput[]
    NOT?: RetraitScalarWhereInput | RetraitScalarWhereInput[]
    id?: StringFilter<"Retrait"> | string
    collecteId?: StringFilter<"Retrait"> | string
    userId?: StringFilter<"Retrait"> | string
    amountXof?: IntFilter<"Retrait"> | number
    method?: StringFilter<"Retrait"> | string
    status?: EnumWithdrawalStatusFilter<"Retrait"> | $Enums.WithdrawalStatus
    processedAt?: DateTimeNullableFilter<"Retrait"> | Date | string | null
    createdAt?: DateTimeFilter<"Retrait"> | Date | string
  }

  export type UserCreateWithoutCollectesInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    retraits?: RetraitCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCollectesInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    retraits?: RetraitUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCollectesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCollectesInput, UserUncheckedCreateWithoutCollectesInput>
  }

  export type DonCreateWithoutCollecteInput = {
    id?: string
    amountXof: number
    paymentMethod: string
    anonymous?: boolean
    donorName?: string | null
    status?: $Enums.PaymentStatus
    transactionId?: string | null
    createdAt?: Date | string
  }

  export type DonUncheckedCreateWithoutCollecteInput = {
    id?: string
    amountXof: number
    paymentMethod: string
    anonymous?: boolean
    donorName?: string | null
    status?: $Enums.PaymentStatus
    transactionId?: string | null
    createdAt?: Date | string
  }

  export type DonCreateOrConnectWithoutCollecteInput = {
    where: DonWhereUniqueInput
    create: XOR<DonCreateWithoutCollecteInput, DonUncheckedCreateWithoutCollecteInput>
  }

  export type DonCreateManyCollecteInputEnvelope = {
    data: DonCreateManyCollecteInput | DonCreateManyCollecteInput[]
    skipDuplicates?: boolean
  }

  export type UpdateCreateWithoutCollecteInput = {
    id?: string
    content: string
    createdAt?: Date | string
  }

  export type UpdateUncheckedCreateWithoutCollecteInput = {
    id?: string
    content: string
    createdAt?: Date | string
  }

  export type UpdateCreateOrConnectWithoutCollecteInput = {
    where: UpdateWhereUniqueInput
    create: XOR<UpdateCreateWithoutCollecteInput, UpdateUncheckedCreateWithoutCollecteInput>
  }

  export type UpdateCreateManyCollecteInputEnvelope = {
    data: UpdateCreateManyCollecteInput | UpdateCreateManyCollecteInput[]
    skipDuplicates?: boolean
  }

  export type SignalementCreateWithoutCollecteInput = {
    id?: string
    reason: string
    status?: string
    createdAt?: Date | string
  }

  export type SignalementUncheckedCreateWithoutCollecteInput = {
    id?: string
    reason: string
    status?: string
    createdAt?: Date | string
  }

  export type SignalementCreateOrConnectWithoutCollecteInput = {
    where: SignalementWhereUniqueInput
    create: XOR<SignalementCreateWithoutCollecteInput, SignalementUncheckedCreateWithoutCollecteInput>
  }

  export type SignalementCreateManyCollecteInputEnvelope = {
    data: SignalementCreateManyCollecteInput | SignalementCreateManyCollecteInput[]
    skipDuplicates?: boolean
  }

  export type RetraitCreateWithoutCollecteInput = {
    id?: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRetraitsInput
  }

  export type RetraitUncheckedCreateWithoutCollecteInput = {
    id?: string
    userId: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RetraitCreateOrConnectWithoutCollecteInput = {
    where: RetraitWhereUniqueInput
    create: XOR<RetraitCreateWithoutCollecteInput, RetraitUncheckedCreateWithoutCollecteInput>
  }

  export type RetraitCreateManyCollecteInputEnvelope = {
    data: RetraitCreateManyCollecteInput | RetraitCreateManyCollecteInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCollectesInput = {
    update: XOR<UserUpdateWithoutCollectesInput, UserUncheckedUpdateWithoutCollectesInput>
    create: XOR<UserCreateWithoutCollectesInput, UserUncheckedCreateWithoutCollectesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCollectesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCollectesInput, UserUncheckedUpdateWithoutCollectesInput>
  }

  export type UserUpdateWithoutCollectesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    retraits?: RetraitUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCollectesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    retraits?: RetraitUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DonUpsertWithWhereUniqueWithoutCollecteInput = {
    where: DonWhereUniqueInput
    update: XOR<DonUpdateWithoutCollecteInput, DonUncheckedUpdateWithoutCollecteInput>
    create: XOR<DonCreateWithoutCollecteInput, DonUncheckedCreateWithoutCollecteInput>
  }

  export type DonUpdateWithWhereUniqueWithoutCollecteInput = {
    where: DonWhereUniqueInput
    data: XOR<DonUpdateWithoutCollecteInput, DonUncheckedUpdateWithoutCollecteInput>
  }

  export type DonUpdateManyWithWhereWithoutCollecteInput = {
    where: DonScalarWhereInput
    data: XOR<DonUpdateManyMutationInput, DonUncheckedUpdateManyWithoutCollecteInput>
  }

  export type DonScalarWhereInput = {
    AND?: DonScalarWhereInput | DonScalarWhereInput[]
    OR?: DonScalarWhereInput[]
    NOT?: DonScalarWhereInput | DonScalarWhereInput[]
    id?: StringFilter<"Don"> | string
    collecteId?: StringFilter<"Don"> | string
    amountXof?: IntFilter<"Don"> | number
    paymentMethod?: StringFilter<"Don"> | string
    anonymous?: BoolFilter<"Don"> | boolean
    donorName?: StringNullableFilter<"Don"> | string | null
    status?: EnumPaymentStatusFilter<"Don"> | $Enums.PaymentStatus
    transactionId?: StringNullableFilter<"Don"> | string | null
    createdAt?: DateTimeFilter<"Don"> | Date | string
  }

  export type UpdateUpsertWithWhereUniqueWithoutCollecteInput = {
    where: UpdateWhereUniqueInput
    update: XOR<UpdateUpdateWithoutCollecteInput, UpdateUncheckedUpdateWithoutCollecteInput>
    create: XOR<UpdateCreateWithoutCollecteInput, UpdateUncheckedCreateWithoutCollecteInput>
  }

  export type UpdateUpdateWithWhereUniqueWithoutCollecteInput = {
    where: UpdateWhereUniqueInput
    data: XOR<UpdateUpdateWithoutCollecteInput, UpdateUncheckedUpdateWithoutCollecteInput>
  }

  export type UpdateUpdateManyWithWhereWithoutCollecteInput = {
    where: UpdateScalarWhereInput
    data: XOR<UpdateUpdateManyMutationInput, UpdateUncheckedUpdateManyWithoutCollecteInput>
  }

  export type UpdateScalarWhereInput = {
    AND?: UpdateScalarWhereInput | UpdateScalarWhereInput[]
    OR?: UpdateScalarWhereInput[]
    NOT?: UpdateScalarWhereInput | UpdateScalarWhereInput[]
    id?: StringFilter<"Update"> | string
    collecteId?: StringFilter<"Update"> | string
    content?: StringFilter<"Update"> | string
    createdAt?: DateTimeFilter<"Update"> | Date | string
  }

  export type SignalementUpsertWithWhereUniqueWithoutCollecteInput = {
    where: SignalementWhereUniqueInput
    update: XOR<SignalementUpdateWithoutCollecteInput, SignalementUncheckedUpdateWithoutCollecteInput>
    create: XOR<SignalementCreateWithoutCollecteInput, SignalementUncheckedCreateWithoutCollecteInput>
  }

  export type SignalementUpdateWithWhereUniqueWithoutCollecteInput = {
    where: SignalementWhereUniqueInput
    data: XOR<SignalementUpdateWithoutCollecteInput, SignalementUncheckedUpdateWithoutCollecteInput>
  }

  export type SignalementUpdateManyWithWhereWithoutCollecteInput = {
    where: SignalementScalarWhereInput
    data: XOR<SignalementUpdateManyMutationInput, SignalementUncheckedUpdateManyWithoutCollecteInput>
  }

  export type SignalementScalarWhereInput = {
    AND?: SignalementScalarWhereInput | SignalementScalarWhereInput[]
    OR?: SignalementScalarWhereInput[]
    NOT?: SignalementScalarWhereInput | SignalementScalarWhereInput[]
    id?: StringFilter<"Signalement"> | string
    collecteId?: StringFilter<"Signalement"> | string
    reason?: StringFilter<"Signalement"> | string
    status?: StringFilter<"Signalement"> | string
    createdAt?: DateTimeFilter<"Signalement"> | Date | string
  }

  export type RetraitUpsertWithWhereUniqueWithoutCollecteInput = {
    where: RetraitWhereUniqueInput
    update: XOR<RetraitUpdateWithoutCollecteInput, RetraitUncheckedUpdateWithoutCollecteInput>
    create: XOR<RetraitCreateWithoutCollecteInput, RetraitUncheckedCreateWithoutCollecteInput>
  }

  export type RetraitUpdateWithWhereUniqueWithoutCollecteInput = {
    where: RetraitWhereUniqueInput
    data: XOR<RetraitUpdateWithoutCollecteInput, RetraitUncheckedUpdateWithoutCollecteInput>
  }

  export type RetraitUpdateManyWithWhereWithoutCollecteInput = {
    where: RetraitScalarWhereInput
    data: XOR<RetraitUpdateManyMutationInput, RetraitUncheckedUpdateManyWithoutCollecteInput>
  }

  export type CollecteCreateWithoutDonsInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollectesInput
    updates?: UpdateCreateNestedManyWithoutCollecteInput
    signalements?: SignalementCreateNestedManyWithoutCollecteInput
    retraits?: RetraitCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUncheckedCreateWithoutDonsInput = {
    id?: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updates?: UpdateUncheckedCreateNestedManyWithoutCollecteInput
    signalements?: SignalementUncheckedCreateNestedManyWithoutCollecteInput
    retraits?: RetraitUncheckedCreateNestedManyWithoutCollecteInput
  }

  export type CollecteCreateOrConnectWithoutDonsInput = {
    where: CollecteWhereUniqueInput
    create: XOR<CollecteCreateWithoutDonsInput, CollecteUncheckedCreateWithoutDonsInput>
  }

  export type CollecteUpsertWithoutDonsInput = {
    update: XOR<CollecteUpdateWithoutDonsInput, CollecteUncheckedUpdateWithoutDonsInput>
    create: XOR<CollecteCreateWithoutDonsInput, CollecteUncheckedCreateWithoutDonsInput>
    where?: CollecteWhereInput
  }

  export type CollecteUpdateToOneWithWhereWithoutDonsInput = {
    where?: CollecteWhereInput
    data: XOR<CollecteUpdateWithoutDonsInput, CollecteUncheckedUpdateWithoutDonsInput>
  }

  export type CollecteUpdateWithoutDonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollectesNestedInput
    updates?: UpdateUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateWithoutDonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updates?: UpdateUncheckedUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUncheckedUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUncheckedUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteCreateWithoutRetraitsInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollectesInput
    dons?: DonCreateNestedManyWithoutCollecteInput
    updates?: UpdateCreateNestedManyWithoutCollecteInput
    signalements?: SignalementCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUncheckedCreateWithoutRetraitsInput = {
    id?: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dons?: DonUncheckedCreateNestedManyWithoutCollecteInput
    updates?: UpdateUncheckedCreateNestedManyWithoutCollecteInput
    signalements?: SignalementUncheckedCreateNestedManyWithoutCollecteInput
  }

  export type CollecteCreateOrConnectWithoutRetraitsInput = {
    where: CollecteWhereUniqueInput
    create: XOR<CollecteCreateWithoutRetraitsInput, CollecteUncheckedCreateWithoutRetraitsInput>
  }

  export type UserCreateWithoutRetraitsInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    collectes?: CollecteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRetraitsInput = {
    id?: string
    phone: string
    name?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    collectes?: CollecteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRetraitsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRetraitsInput, UserUncheckedCreateWithoutRetraitsInput>
  }

  export type CollecteUpsertWithoutRetraitsInput = {
    update: XOR<CollecteUpdateWithoutRetraitsInput, CollecteUncheckedUpdateWithoutRetraitsInput>
    create: XOR<CollecteCreateWithoutRetraitsInput, CollecteUncheckedCreateWithoutRetraitsInput>
    where?: CollecteWhereInput
  }

  export type CollecteUpdateToOneWithWhereWithoutRetraitsInput = {
    where?: CollecteWhereInput
    data: XOR<CollecteUpdateWithoutRetraitsInput, CollecteUncheckedUpdateWithoutRetraitsInput>
  }

  export type CollecteUpdateWithoutRetraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollectesNestedInput
    dons?: DonUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateWithoutRetraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dons?: DonUncheckedUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUncheckedUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUncheckedUpdateManyWithoutCollecteNestedInput
  }

  export type UserUpsertWithoutRetraitsInput = {
    update: XOR<UserUpdateWithoutRetraitsInput, UserUncheckedUpdateWithoutRetraitsInput>
    create: XOR<UserCreateWithoutRetraitsInput, UserUncheckedCreateWithoutRetraitsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRetraitsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRetraitsInput, UserUncheckedUpdateWithoutRetraitsInput>
  }

  export type UserUpdateWithoutRetraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collectes?: CollecteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRetraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collectes?: CollecteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CollecteCreateWithoutUpdatesInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollectesInput
    dons?: DonCreateNestedManyWithoutCollecteInput
    signalements?: SignalementCreateNestedManyWithoutCollecteInput
    retraits?: RetraitCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUncheckedCreateWithoutUpdatesInput = {
    id?: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dons?: DonUncheckedCreateNestedManyWithoutCollecteInput
    signalements?: SignalementUncheckedCreateNestedManyWithoutCollecteInput
    retraits?: RetraitUncheckedCreateNestedManyWithoutCollecteInput
  }

  export type CollecteCreateOrConnectWithoutUpdatesInput = {
    where: CollecteWhereUniqueInput
    create: XOR<CollecteCreateWithoutUpdatesInput, CollecteUncheckedCreateWithoutUpdatesInput>
  }

  export type CollecteUpsertWithoutUpdatesInput = {
    update: XOR<CollecteUpdateWithoutUpdatesInput, CollecteUncheckedUpdateWithoutUpdatesInput>
    create: XOR<CollecteCreateWithoutUpdatesInput, CollecteUncheckedCreateWithoutUpdatesInput>
    where?: CollecteWhereInput
  }

  export type CollecteUpdateToOneWithWhereWithoutUpdatesInput = {
    where?: CollecteWhereInput
    data: XOR<CollecteUpdateWithoutUpdatesInput, CollecteUncheckedUpdateWithoutUpdatesInput>
  }

  export type CollecteUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollectesNestedInput
    dons?: DonUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dons?: DonUncheckedUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUncheckedUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUncheckedUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteCreateWithoutSignalementsInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollectesInput
    dons?: DonCreateNestedManyWithoutCollecteInput
    updates?: UpdateCreateNestedManyWithoutCollecteInput
    retraits?: RetraitCreateNestedManyWithoutCollecteInput
  }

  export type CollecteUncheckedCreateWithoutSignalementsInput = {
    id?: string
    userId: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dons?: DonUncheckedCreateNestedManyWithoutCollecteInput
    updates?: UpdateUncheckedCreateNestedManyWithoutCollecteInput
    retraits?: RetraitUncheckedCreateNestedManyWithoutCollecteInput
  }

  export type CollecteCreateOrConnectWithoutSignalementsInput = {
    where: CollecteWhereUniqueInput
    create: XOR<CollecteCreateWithoutSignalementsInput, CollecteUncheckedCreateWithoutSignalementsInput>
  }

  export type CollecteUpsertWithoutSignalementsInput = {
    update: XOR<CollecteUpdateWithoutSignalementsInput, CollecteUncheckedUpdateWithoutSignalementsInput>
    create: XOR<CollecteCreateWithoutSignalementsInput, CollecteUncheckedCreateWithoutSignalementsInput>
    where?: CollecteWhereInput
  }

  export type CollecteUpdateToOneWithWhereWithoutSignalementsInput = {
    where?: CollecteWhereInput
    data: XOR<CollecteUpdateWithoutSignalementsInput, CollecteUncheckedUpdateWithoutSignalementsInput>
  }

  export type CollecteUpdateWithoutSignalementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollectesNestedInput
    dons?: DonUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateWithoutSignalementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dons?: DonUncheckedUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUncheckedUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUncheckedUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteCreateManyUserInput = {
    id?: string
    slug: string
    title: string
    description: string
    category: $Enums.Category
    targetXof: number
    collectedXof?: number
    endDate: Date | string
    status?: $Enums.CollecteStatus
    photoUrl?: string | null
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RetraitCreateManyUserInput = {
    id?: string
    collecteId: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CollecteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dons?: DonUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dons?: DonUncheckedUpdateManyWithoutCollecteNestedInput
    updates?: UpdateUncheckedUpdateManyWithoutCollecteNestedInput
    signalements?: SignalementUncheckedUpdateManyWithoutCollecteNestedInput
    retraits?: RetraitUncheckedUpdateManyWithoutCollecteNestedInput
  }

  export type CollecteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    targetXof?: IntFieldUpdateOperationsInput | number
    collectedXof?: IntFieldUpdateOperationsInput | number
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCollecteStatusFieldUpdateOperationsInput | $Enums.CollecteStatus
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collecte?: CollecteUpdateOneRequiredWithoutRetraitsNestedInput
  }

  export type RetraitUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    collecteId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonCreateManyCollecteInput = {
    id?: string
    amountXof: number
    paymentMethod: string
    anonymous?: boolean
    donorName?: string | null
    status?: $Enums.PaymentStatus
    transactionId?: string | null
    createdAt?: Date | string
  }

  export type UpdateCreateManyCollecteInput = {
    id?: string
    content: string
    createdAt?: Date | string
  }

  export type SignalementCreateManyCollecteInput = {
    id?: string
    reason: string
    status?: string
    createdAt?: Date | string
  }

  export type RetraitCreateManyCollecteInput = {
    id?: string
    userId: string
    amountXof: number
    method: string
    status?: $Enums.WithdrawalStatus
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DonUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonUncheckedUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonUncheckedUpdateManyWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateUncheckedUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateUncheckedUpdateManyWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalementUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalementUncheckedUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalementUncheckedUpdateManyWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRetraitsNestedInput
  }

  export type RetraitUncheckedUpdateWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetraitUncheckedUpdateManyWithoutCollecteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountXof?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}