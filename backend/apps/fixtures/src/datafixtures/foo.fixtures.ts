import { Fixtures } from '@dauflo/nest-fixtures'

export class FooFixtures extends Fixtures {
    constructor(/* @InjectModel(Foo.name) private model: Model<FooDocument>, private reference: ReferenceRepository */) {
        super()
    }

    async load(): Promise<void> {
        // const documents = await this.model.insertMany([{ name: 'Foo1' }, { name: 'Foo2' }])
        // this.reference.addReference('foo', documents)
    }
}
